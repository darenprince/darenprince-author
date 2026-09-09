const REPO = 'darenprince/darenprince-author'
const RUNS_URL = `https://api.github.com/repos/${REPO}/actions/runs?branch=main&per_page=50`

export function normalizeWorkflowRun(run) {
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

function pickRun(runs, name, targetRevision = '') {
  return runs.find(run => run.name === name && targetRevision && run.head_sha === targetRevision)
    || runs.find(run => run.name === name)
}

export function workflowEvidenceState(record, matchesSource, { isPending = false, isError = false } = {}) {
  if (isPending) return 'PENDING'
  if (isError) return 'UNAVAILABLE'
  if (!record) return 'NOT REPORTED'
  if (matchesSource === false) return 'STALE'
  if (matchesSource === null || matchesSource === undefined) return 'UNVERIFIED'
  return record.state
}

export function selectWorkflowRuns(runs, { frontendRevision = '', backendRevision = '' } = {}) {
  const frontendQaRun = pickRun(runs, 'VoxVector QA', frontendRevision)
  const backendQaRun = pickRun(runs, 'VoxVector QA', backendRevision)
  const deploymentRun = pickRun(runs, 'Deploy GitHub Pages', frontendRevision)
  const lockfileRun = pickRun(runs, 'Regenerate VoxVector Lockfile', frontendRevision)
  return {
    qa: normalizeWorkflowRun(frontendQaRun),
    frontendQa: normalizeWorkflowRun(frontendQaRun),
    backendQa: normalizeWorkflowRun(backendQaRun),
    deployment: normalizeWorkflowRun(deploymentRun),
    lockfile: normalizeWorkflowRun(lockfileRun),
    frontendQaMatchesSource: frontendRevision ? frontendQaRun?.head_sha === frontendRevision : null,
    backendQaMatchesSource: backendRevision ? backendQaRun?.head_sha === backendRevision : null,
    deploymentMatchesSource: frontendRevision ? deploymentRun?.head_sha === frontendRevision : null,
    qaMatchesSource: frontendRevision ? frontendQaRun?.head_sha === frontendRevision : null,
  }
}

export async function getGitHubWorkflowStatus(revisions = {}) {
  const normalizedRevisions = typeof revisions === 'string'
    ? { frontendRevision: revisions, backendRevision: revisions }
    : revisions
  const response = await fetch(RUNS_URL, {
    headers: { Accept: 'application/vnd.github+json' },
    cache: 'no-store',
  })
  if (!response.ok) throw new Error(`GitHub workflow status unavailable (HTTP ${response.status})`)
  const payload = await response.json()
  const runs = Array.isArray(payload.workflow_runs) ? payload.workflow_runs : []
  const selected = selectWorkflowRuns(runs, normalizedRevisions)
  return {
    fetchedAt: new Date().toISOString(),
    source: 'GitHub Actions',
    frontendRevision: normalizedRevisions.frontendRevision || '',
    backendRevision: normalizedRevisions.backendRevision || '',
    ...selected,
  }
}
