import React from 'react'

export class RuntimeBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, message: '' }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error instanceof Error ? error.message : String(error) }
  }

  componentDidCatch(error, info) {
    console.error('[VoxVector] runtime boundary caught an error', error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children
    if (this.props.silent) return null

    return (
      <main className="vv-runtime-failure" role="alert" aria-live="assertive">
        <div className="vv-runtime-failure__panel">
          <div className="vv-runtime-failure__eyebrow">VOXVECTOR</div>
          <h1>VoxVector could not initialize.</h1>
          <p>The application hit a startup error. Nothing is hidden behind the loading screen.</p>
          <button type="button" onClick={() => window.location.reload()}>Reload VoxVector</button>
          {import.meta.env.DEV && <pre>{this.state.message}</pre>}
        </div>
      </main>
    )
  }
}

export function EnhancementBoundary({ children }) {
  return <RuntimeBoundary silent>{children}</RuntimeBoundary>
}
