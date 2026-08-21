import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ChevronDown, ChevronsDownUp, ChevronsUpDown, Filter, Search } from 'lucide-react'

const SOURCE = 'https://raw.githubusercontent.com/darenprince/darenprince-author/main/VoxVector/docs/MASTER_METHOD_INDEX.md'

const fallbackCategories = [
  ['D01', 'Signal and Acoustic Fundamentals'], ['D02', 'Spectral Analysis'], ['D03', 'Cepstral Analysis'], ['D04', 'Fundamental Frequency and Pitch'],
  ['D05', 'Prosody and Intonation'], ['D06', 'Intensity and Energy Dynamics'], ['D07', 'Voice Quality'], ['D08', 'Glottal Source'],
  ['D09', 'Formants and Vocal Tract'], ['D10', 'Temporal and Speech Rate'], ['D11', 'Pause and Hesitation'], ['D12', 'Response Latency'],
  ['D13', 'Turn Taking and Interaction'], ['D14', 'Speaker Baseline'], ['D15', 'Transcript and Linguistic Analysis'], ['D16', 'Disfluency and Repairs'],
  ['D17', 'Question and Answer Alignment'], ['D18', 'Semantic and Consistency Analysis'], ['D19', 'Learned Speech Representations'], ['D20', 'Temporal Neural Modeling'],
  ['D21', 'Speaker Diarization and Separation'], ['D22', 'Recording and Media Integrity'], ['D23', 'Eligibility and Reliability'], ['D24', 'Evidence Convergence and Conflict'],
  ['D25', 'Alternative Explanations and Confounders'], ['D26', 'Uncertainty and Calibration'], ['D27', 'Candidate Classification'], ['D28', 'Deception Inference'],
  ['D29', 'Multimodal Audio and Video'], ['D30', 'Synthetic Speech and Media Integrity'], ['D31', 'Scientific Validation and Robustness'], ['D32', 'Final Classification and Disposition'],
].map(([id, title]) => ({ id, title, tables: [], paragraphs: [] }))

function parseMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/)
  const sections = []
  let current = null
  let table = null
  let pending = []

  const flushTable = () => {
    if (!current || !table) return
    current.tables.push(table)
    table = null
  }

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim()
    const heading = line.match(/^#\s+(D\d+)\s+—\s+(.+)$/)
    const subheading = line.match(/^###\s+(.+)$/)

    if (heading) {
      flushTable()
      pending = []
      current = { id: heading[1], title: heading[2], tables: [], paragraphs: [] }
      sections.push(current)
      continue
    }

    if (!current) continue

    if (subheading) {
      flushTable()
      pending.push({ type: 'subheading', text: subheading[1] })
      continue
    }

    if (line.startsWith('|') && line.endsWith('|')) {
      const cells = line.slice(1, -1).split('|').map(cell => cell.trim())
      const separator = cells.every(cell => /^:?-{3,}:?$/.test(cell))
      if (separator) continue
      if (!table) {
        table = { title: pending.length ? pending[pending.length - 1].text : '', headers: cells, rows: [] }
        pending = []
      } else {
        table.rows.push(cells)
      }
      continue
    }

    if (line === '---') {
      flushTable()
      continue
    }

    if (line) {
      flushTable()
      if (!line.startsWith('#')) current.paragraphs.push(line.replace(/\*\*/g, ''))
    }
  }
  flushTable()

  return sections.length ? sections : fallbackCategories
}

function statusFor(text) {
  const value = text.toUpperCase()
  if (value.includes('PLANNED')) return 'planned'
  if (value.includes('VALIDATION')) return 'validation'
  if (value.includes('ASSET')) return 'asset'
  return 'current'
}

function StatusBadge({ status }) {
  const labels = { current: 'Current', planned: 'Planned', asset: 'Asset', validation: 'Validation' }
  return <span className={`vv-mi-status vv-mi-status-${status}`}>{labels[status]}</span>
}

function DataTable({ table }) {
  return <div className="vv-mi-table-wrap">
    {table.title && <div className="vv-mi-table-title">{table.title}</div>}
    <table className="vv-mi-table">
      <thead><tr>{table.headers.map((header, index) => <th key={`${header}-${index}`}>{header}</th>)}</tr></thead>
      <tbody>{table.rows.map((row, rowIndex) => <tr key={rowIndex}>{table.headers.map((_, cellIndex) => <td key={cellIndex}>{row[cellIndex] || '—'}</td>)}</tr>)}</tbody>
    </table>
  </div>
}

export default function MethodIndex({ onBack }) {
  const [markdown, setMarkdown] = useState('')
  const [open, setOpen] = useState(new Set(['D01']))
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true
    fetch(SOURCE, { cache: 'no-cache' })
      .then(response => { if (!response.ok) throw new Error('Unable to load canonical index'); return response.text() })
      .then(text => { if (active) { setMarkdown(text); setLoading(false) } })
      .catch(() => { if (active) { setError(true); setLoading(false) } })
    return () => { active = false }
  }, [])

  const categories = useMemo(() => markdown ? parseMarkdown(markdown) : fallbackCategories, [markdown])
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return categories.filter(category => {
      const haystack = `${category.id} ${category.title} ${category.tables.map(t => `${t.title} ${t.headers.join(' ')} ${t.rows.flat().join(' ')}`).join(' ')} ${category.paragraphs.join(' ')}`.toLowerCase()
      const matchesQuery = !needle || haystack.includes(needle)
      const matchesStatus = statusFilter === 'all' || haystack.includes(statusFilter)
      return matchesQuery && matchesStatus
    })
  }, [categories, query, statusFilter])

  const allOpen = filtered.length > 0 && filtered.every(category => open.has(category.id))
  const toggle = id => setOpen(current => { const next = new Set(current); next.has(id) ? next.delete(id) : next.add(id); return next })
  const toggleAll = () => setOpen(current => allOpen ? new Set() : new Set(filtered.map(category => category.id)))

  return <div className="vv-mi-page">
    <header className="vv-mi-header">
      <div className="vv-mi-topline">
        <button className="vv-mi-back" onClick={onBack}><ArrowLeft size={16} /> Back to VoxVector</button>
        <span className="vv-mi-kicker">Research architecture</span>
      </div>
      <div className="vv-mi-hero">
        <div>
          <div className="vv-mi-eyebrow">MASTER METHOD INDEX</div>
          <h1>VoxVector analysis methods</h1>
          <p>Explore the complete analysis architecture at the individual data point level. Each category can be expanded independently or opened together. Current implementation remains distinct from planned research scope.</p>
        </div>
        <div className="vv-mi-actions"><button onClick={toggleAll} className="vv-mi-primary">{allOpen ? <ChevronsDownUp size={17} /> : <ChevronsUpDown size={17} />}{allOpen ? 'Collapse all' : 'Expand all'}</button></div>
      </div>
      <div className="vv-mi-explainer">
        <div><strong>Eligibility and reliability</strong><span>Determine whether the material is usable.</span></div>
        <div><strong>Evidence collection</strong><span>Measure supported observations.</span></div>
        <div><strong>Candidate classification</strong><span>Evaluate convergence and conflict.</span></div>
        <div><strong>Final disposition</strong><span>Apply reliability and validation gates.</span></div>
      </div>
      <div className="vv-mi-rule"><strong>Scientific boundary</strong> Individual vocal or behavioral features do not prove deception. The index separates observations from inference and preserves uncertainty and alternative explanations.</div>
    </header>

    <main className="vv-mi-main">
      <div className="vv-mi-toolbar">
        <label className="vv-mi-search"><Search size={17} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search methods or data points" aria-label="Search methods or data points" /></label>
        <div className="vv-mi-filters"><Filter size={15} />{['all', 'current', 'planned', 'asset', 'validation'].map(status => <button key={status} className={statusFilter === status ? 'active' : ''} onClick={() => setStatusFilter(status)}>{status === 'all' ? 'All' : status}</button>)}</div>
      </div>

      <div className="vv-mi-meta"><span>{filtered.length} categories</span><span>{loading ? 'Loading canonical index…' : error ? 'Showing fallback category index' : 'Canonical index loaded'}</span></div>

      <div className="vv-mi-list">
        {filtered.map((category, index) => {
          const expanded = open.has(category.id)
          return <section key={category.id} className={`vv-mi-card ${expanded ? 'is-open' : ''}`}>
            <button className="vv-mi-card-head" onClick={() => toggle(category.id)} aria-expanded={expanded}>
              <span className="vv-mi-number">{category.id}</span>
              <span className="vv-mi-card-title"><strong>{category.title}</strong><small>{category.tables.reduce((sum, table) => sum + table.rows.flat().filter(Boolean).length, 0)} indexed cells</small></span>
              <span className="vv-mi-chevron"><ChevronDown size={20} /></span>
            </button>
            {expanded && <div className="vv-mi-card-body">
              {category.paragraphs.length > 0 && <div className="vv-mi-notes">{category.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div>}
              {category.tables.map((table, i) => <DataTable key={i} table={table} />)}
            </div>}
          </section>
        })}
      </div>
      {filtered.length === 0 && <div className="vv-mi-empty">No indexed methods match this search.</div>}
    </main>
    <footer className="vv-mi-footer">Source of truth: <a href="https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/MASTER_METHOD_INDEX.md" target="_blank" rel="noreferrer">MASTER_METHOD_INDEX.md</a></footer>
  </div>
}
