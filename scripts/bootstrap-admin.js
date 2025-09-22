#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js'
import { resolveSupabaseConfigSync } from '../supabase/env.js'

function printUsage(message) {
  if (message) {
    console.error(`\n${message}\n`)
  }
  console.log(
    `Usage: node scripts/bootstrap-admin.js --email you@example.com [--password newpass] [--name "First Last"]`
  )
  console.log('Options:')
  console.log('  --email       Email address for the admin user (required)')
  console.log('  --password    Password to assign (optional, random if omitted for new users)')
  console.log('  --name        Full name to store in profile metadata (optional)')
  console.log('  --first-name  Explicit first name override (optional)')
  console.log('  --last-name   Explicit last name override (optional)')
  process.exit(message ? 1 : 0)
}

function parseArgs(argv) {
  const args = {}
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (!arg.startsWith('--')) continue
    const key = arg.slice(2)
    const next = argv[i + 1]
    if (!next || next.startsWith('--')) {
      args[key] = true
      continue
    }
    args[key] = next
    i += 1
  }
  return args
}

const cli = parseArgs(process.argv.slice(2))
const email = cli.email || cli.e
if (!email) {
  printUsage('Missing required --email option.')
}

const rawName = cli.name
const firstName = cli['first-name'] || (rawName ? rawName.split(' ')[0] : undefined)
const lastName =
  cli['last-name'] || (rawName ? rawName.split(' ').slice(1).join(' ') || undefined : undefined)
const password = cli.password === true ? undefined : cli.password

const { url } = resolveSupabaseConfigSync()
const serviceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY ||
  process.env.SUPABASE_SERVICE_ROLE ||
  process.env.SUPABASE_SERVICE_API_KEY

if (!url) {
  printUsage('Supabase URL not found. Set SUPABASE_DATABASE_URL or NEXT_PUBLIC_SUPABASE_URL.')
}

if (!serviceKey) {
  printUsage(
    'Supabase service role key not found. Set SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SERVICE_KEY) before running.'
  )
}

const adminClient = createClient(url, serviceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function ensureProfile(userId, names) {
  const { data: profile } = await adminClient
    .from('profiles')
    .select('user_id, first_name, last_name, role')
    .eq('user_id', userId)
    .maybeSingle()

  const payload = {
    user_id: userId,
    role: 'admin',
    first_name: names.firstName ?? profile?.first_name ?? null,
    last_name: names.lastName ?? profile?.last_name ?? null,
  }

  const { data, error } = await adminClient
    .from('profiles')
    .upsert(payload, { onConflict: 'user_id' })
    .select('user_id, first_name, last_name, role')
    .single()

  if (error) {
    throw new Error(`Failed to upsert profile: ${error.message}`)
  }

  return data ?? payload
}

async function main() {
  console.log('Connecting to Supabase project:', url)

  const { data: listResult, error: listError } = await adminClient.auth.admin.listUsers({
    page: 1,
    perPage: 200,
    email,
  })
  if (listError) {
    throw new Error(`Failed to look up user: ${listError.message}`)
  }

  const existing =
    listResult?.users?.find((user) => user.email?.toLowerCase() === email.toLowerCase()) || null
  let user = existing
  let generatedPassword = null

  if (!user) {
    generatedPassword = password || `Admin-${Math.random().toString(36).slice(2, 10)}`
    console.log('No user found. Creating a confirmed account…')
    const { data, error } = await adminClient.auth.admin.createUser({
      email,
      password: generatedPassword,
      email_confirm: true,
      user_metadata: {
        role: 'admin',
        ...(firstName ? { first_name: firstName } : {}),
        ...(lastName ? { last_name: lastName } : {}),
      },
      app_metadata: {
        role: 'admin',
      },
    })
    if (error) {
      throw new Error(`Failed to create user: ${error.message}`)
    }
    user = data.user
  } else {
    console.log('User already exists. Updating metadata and role…')
    const updatePayload = {
      app_metadata: {
        ...(user.app_metadata || {}),
        role: 'admin',
      },
      user_metadata: {
        ...(user.user_metadata || {}),
        role: 'admin',
        ...(firstName ? { first_name: firstName } : {}),
        ...(lastName ? { last_name: lastName } : {}),
      },
    }
    if (password) {
      updatePayload.password = password
    }

    const { data, error } = await adminClient.auth.admin.updateUserById(user.id, updatePayload)
    if (error) {
      throw new Error(`Failed to elevate user: ${error.message}`)
    }
    user = data.user
  }

  const profile = await ensureProfile(user.id, { firstName, lastName })

  console.log('\nAdmin bootstrap complete. Current state:')
  console.table([
    {
      id: user.id,
      email: user.email,
      first_name: profile.first_name,
      last_name: profile.last_name,
      role: profile.role,
    },
  ])

  if (password) {
    console.log('\nLogin with the password you supplied.')
  } else if (generatedPassword) {
    console.log(`\nTemporary password generated: ${generatedPassword}`)
    console.log('Please store it securely or update the password from the Supabase dashboard.')
  } else {
    console.log('\nExisting password preserved.')
  }

  console.log('\nYou can now sign in at login.html and should see admin-only areas.')
}

main().catch((error) => {
  console.error('\nAdmin bootstrap failed:', error.message)
  process.exit(1)
})
