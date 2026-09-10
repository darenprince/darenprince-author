import { useState } from 'react'
import { Download } from 'lucide-react'
import { downloadDebugBundle } from '../lib/api'
import Button from './ui/Button'

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
  const ready = Boolean(accessToken && caseId && runId)

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
          : 'Debug bundle downloaded. Review manifest.json for included and unavailable evidence.',
      })
    } catch (error) {
      setState({ loading: false, message: '', error: error?.message || 'Debug bundle download failed.' })
    }
  }

  return <div className="flex max-w-full flex-col items-end gap-1">
    <Button variant="accent" onClick={download} disabled={!ready || state.loading} aria-busy={state.loading ? 'true' : undefined} title={ready ? 'Download sanitized Render and Supabase debugging evidence for this analysis run' : 'Available as soon as an analysis run has been persisted'}>
      <Download size={13}/>{state.loading ? 'Collecting debug bundle…' : 'Download Debug Bundle'}
    </Button>
    {state.message && <span className="max-w-sm text-right text-[10px] text-emerald-300" role="status">{state.message}</span>}
    {state.error && <span className="max-w-sm text-right text-[10px] text-red-300" role="alert">{state.error}</span>}
  </div>
}
