import { useState } from 'react'
import { Download } from 'lucide-react'
import { downloadDebugBundle } from '../lib/api'
import Button from './ui/Button'

const TERMINAL = new Set(['completed', 'complete', 'success', 'succeeded', 'completed_with_failures', 'failed', 'error', 'timeout', 'timed_out', 'cancelled', 'canceled', 'interrupted'])

function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export default function DebugBundleButton({ accessToken, caseId, run }) {
  const [state, setState] = useState({ loading: false, message: '', error: '' })
  const runId = run?.run_id || run?.analysis_id || ''
  const ready = Boolean(accessToken && caseId && runId && TERMINAL.has(String(run?.status || '').toLowerCase()))

  const download = async () => {
    if (!ready || state.loading) return
    setState({ loading: true, message: '', error: '' })
    try {
      const result = await downloadDebugBundle(accessToken, caseId, runId)
      saveBlob(result.blob, result.filename)
      setState({
        loading: false,
        error: '',
        message: result.missingEvidenceCount
          ? `Debug bundle downloaded with ${result.missingEvidenceCount} unavailable evidence source${result.missingEvidenceCount === 1 ? '' : 's'}. See manifest.json.`
          : 'Debug bundle downloaded with all requested evidence sources available.',
      })
    } catch (error) {
      setState({ loading: false, message: '', error: error?.message || 'Debug bundle download failed.' })
    }
  }

  return <div className="flex max-w-full flex-col items-end gap-1">
    <Button variant="accent" onClick={download} disabled={!ready || state.loading} aria-busy={state.loading ? 'true' : undefined} title={ready ? 'Download sanitized Render and Supabase debugging evidence for this analysis run' : 'Available after the analysis reaches a terminal state'}>
      <Download size={13}/>{state.loading ? 'Collecting debug bundle…' : 'Download Debug Bundle'}
    </Button>
    {state.message && <span className="max-w-sm text-right text-[10px] text-emerald-300" role="status">{state.message}</span>}
    {state.error && <span className="max-w-sm text-right text-[10px] text-red-300" role="alert">{state.error}</span>}
  </div>
}
