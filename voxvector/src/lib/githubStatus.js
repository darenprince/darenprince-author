const REPO = 'darenprince/darenprince-author'
const RUNS_URL = `https://api.github.com/repos/${REPO}/actions/runs?per_page=30`

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

export async function getGitHubWorkflowStatus() {
  const response = await fetch(RUNS_URL, {
    headers: { Accept: 'application/vnd.github+json' },
    cache: 'no-store',
  })
  if (!response.ok) throw new Error(`GitHub workflow status unavailable (HTTP ${response.status})`)
  const payload = await response.json()
  const runs = Array.isArray(payload.workflow_runs) ? payload.workflow_runs : []
  const latest = name => normalize(runs.find(run => run.name === name))
  return {
    fetchedAt: new Date().toISOString(),
    qa: latest('VoxVector QA'),
    deployment: latest('Deploy GitHub Pages'),
    lockfile: latest('Regenerate VoxVector Lockfile'),
  }
}
