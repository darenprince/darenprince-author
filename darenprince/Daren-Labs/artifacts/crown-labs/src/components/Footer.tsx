import { ContactModal } from './modals/ContactModal'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Crown Labs" className="h-6 w-auto opacity-60" />
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Crown Labs · Applied Intelligence Studio
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="#portfolio"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Portfolio
          </a>
          <ContactModal
            trigger={
              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </button>
            }
          />
          <a
            href="https://www.darenprince.com/book.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Buy book
          </a>
        </div>
      </div>
    </footer>
  )
}
