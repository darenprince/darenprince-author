const REPO = 'darenprince/darenprince-author'
const RUNS_URL = `https://api.github.com/repos/${REPO}/actions/runs?branch=main&per_page=50`

function normalize(run) {
  if (!run) return null
  const conclusion = run.conclusion || ''
  const status = run.status || 'unknown'
  const state = status !== 'completed'
    ? status.toUpperCase()
    : conclusion === 'success'
      ? 'PASS'
      : conclusion === 'failure'
        ? 'FAIL'
        : conclusion === 'cancelled'
          ? 'CANCELLED'
          : (conclusion || 'UNKNOWN').toUpperCase()
  return {
    id: run.id,
    name: run.name,
    state,
    status,
    conclusion,
    sha: run.head_sha || '',
    updatedAt: run.updated_at || run.created_at || '',
    url: run.html_url || '',
    runNumber: run.run_number,
  }
}

function pickRun(runs, name, currentSha = '') {
  return runs.find(run => run.name === name && (!currentSha || run.head_sha === currentSha))
    || runs.find(run => run.name === name)
}

export async function getGitHubWorkflowStatus(currentSha = '') {
  const response = await fetch(RUNS_URL, {
    headers: { Accept: 'application/vnd.github+json' },
    cache: 'no-store',
  })
  if (!response.ok) throw new Error(`GitHub workflow status unavailable (HTTP ${response.status})`)
  const payload = await response.json()
  const runs = Array.isArray(payload.workflow_runs) ? payload.workflow_runs : []
  const qaRun = pickRun(runs, 'VoxVector QA', currentSha)
  const deploymentRun = pickRun(runs, 'Deploy GitHub Pages', currentSha)
  const lockfileRun = pickRun(runs, 'Regenerate VoxVector Lockfile', currentSha)
  return {
    fetchedAt: new Date().toISOString(),
    sourceRevision: currentSha || '',
    qa: normalize(qaRun),
    deployment: normalize(deploymentRun),
    lockfile: normalize(lockfileRun),
    qaMatchesSource: Boolean(qaRun && (!currentSha || qaRun.head_sha === currentSha)),
    deploymentMatchesSource: Boolean(deploymentRun && (!currentSha || deploymentRun.head_sha === currentSha)),
  }
}
