#!/usr/bin/env node
import { spawnSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const DEFAULT_FUNCTIONS = ['secure-storage', 'admin-users']

const toFlagList = (value) => {
  if (!value) return []
  if (Array.isArray(value)) return value
  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export const planSupabaseCommands = ({
  includeDbPush = true,
  functions = DEFAULT_FUNCTIONS,
  projectRef,
} = {}) => {
  const planned = []

  if (includeDbPush) {
    planned.push({
      description: 'Apply database migrations',
      args: ['db', 'push'],
    })
  }

  const uniqueFunctions = Array.from(new Set(functions)).filter(Boolean)
  for (const fn of uniqueFunctions) {
    planned.push({
      description: `Deploy edge function: ${fn}`,
      args: ['functions', 'deploy', fn, ...(projectRef ? ['--project-ref', projectRef] : [])],
    })
  }

  return planned
}

export const checkSupabaseCli = (spawn = spawnSync) => {
  const result = spawn('supabase', ['--version'], { encoding: 'utf8' })
  if (result.error) {
    if (result.error.code === 'ENOENT') {
      return { ok: false, reason: 'missing', message: 'Supabase CLI not found in PATH.' }
    }
    return { ok: false, reason: 'error', message: result.error.message }
  }
  if (result.status !== 0) {
    return {
      ok: false,
      reason: 'non-zero',
      message: result.stderr || result.stdout || 'Supabase CLI returned a non-zero exit code.',
    }
  }

  const version = (result.stdout || result.stderr || '').toString().trim()
  return { ok: true, version }
}

export const deploySupabase = ({
  dryRun = false,
  includeDbPush = true,
  functions,
  projectRef,
  spawn = spawnSync,
  env = process.env,
} = {}) => {
  const cliCheck = checkSupabaseCli(spawn)
  if (!cliCheck.ok) {
    return { ok: false, reason: 'cli-missing', message: cliCheck.message }
  }

  const commands = planSupabaseCommands({ includeDbPush, functions, projectRef })
  if (dryRun) {
    return { ok: true, reason: 'dry-run', commands }
  }

  for (const command of commands) {
    const result = spawn('supabase', command.args, { stdio: 'inherit', env })
    if (result.error) {
      return {
        ok: false,
        reason: 'spawn-error',
        message: result.error.message,
        failedCommand: command,
      }
    }
    if (result.status !== 0) {
      return {
        ok: false,
        reason: 'non-zero',
        message: `Command "supabase ${command.args.join(' ')}" exited with status ${result.status}.`,
        failedCommand: command,
        status: result.status,
      }
    }
  }

  return { ok: true, commands }
}

const parseCliArgs = (argv) => {
  const args = { includeDbPush: true }

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index]
    if (!token.startsWith('--')) continue

    const key = token.slice(2)
    const next = argv[index + 1]
    switch (key) {
      case 'dry-run':
        args.dryRun = true
        break
      case 'skip-db':
        args.includeDbPush = false
        break
      case 'project-ref':
        if (next && !next.startsWith('--')) {
          args.projectRef = next
          index += 1
        }
        break
      case 'functions':
      case 'only':
        if (next && !next.startsWith('--')) {
          args.functions = toFlagList(next)
          index += 1
        }
        break
      case 'function':
        if (!args.functions) args.functions = []
        if (next && !next.startsWith('--')) {
          args.functions.push(next)
          index += 1
        }
        break
      case 'help':
        args.help = true
        break
      default:
        break
    }
  }

  return args
}

const printHelp = () => {
  console.log(
    `Usage: node scripts/deploy-supabase.js [options]\n\n` +
      'Options:\n' +
      '  --dry-run             Print the commands without executing them\n' +
      '  --skip-db             Skip "supabase db push"\n' +
      '  --functions a,b       Comma-separated list of functions to deploy\n' +
      '  --function name       Repeatable flag for functions to deploy\n' +
      '  --project-ref ref     Explicit Supabase project ref\n' +
      '  --help                Show this help message\n'
  )
}

const isMainModule = () => {
  if (!process.argv[1]) return false
  return import.meta.url === pathToFileURL(resolve(process.argv[1])).href
}

if (isMainModule()) {
  const cli = parseCliArgs(process.argv.slice(2))
  if (cli.help) {
    printHelp()
    process.exit(0)
  }

  const result = deploySupabase({
    dryRun: cli.dryRun,
    includeDbPush: cli.includeDbPush,
    functions: cli.functions,
    projectRef: cli.projectRef || process.env.SUPABASE_PROJECT_REF,
  })

  if (!result.ok) {
    console.error('Supabase deploy failed:', result.message)
    if (result.failedCommand) {
      console.error('Failed command:', `supabase ${result.failedCommand.args.join(' ')}`)
    }
    process.exit(1)
  }

  if (result.reason === 'dry-run') {
    console.log('Dry run – planned commands:')
  } else {
    console.log('Supabase deploy complete. Commands executed:')
  }
  for (const command of result.commands) {
    console.log(` • supabase ${command.args.join(' ')}`)
  }
}
