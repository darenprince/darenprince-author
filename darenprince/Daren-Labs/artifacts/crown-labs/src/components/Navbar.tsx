import { useState, useEffect } from 'react'
import { Menu, X, Bell, LogIn, LogOut, User, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { NotificationsPopover } from './modals/NotificationsPopover'
import { BetaTestersModal } from './modals/BetaTestersModal'
import { useAuth } from '@workspace/replit-auth-web'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, isLoading, isAuthenticated, login, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const displayName = user
    ? [user.firstName, user.lastName].filter(Boolean).join(' ') || user.email || 'Lab member'
    : null

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-border/60 transition-colors duration-300 ${scrolled ? 'bg-background/90 backdrop-blur-md' : 'bg-background/0'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Crown Labs" className="h-8 w-auto" />
          </a>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold tracking-widest text-foreground/90 uppercase">
              Crown Labs
            </p>
            <p className="text-[10px] tracking-wider text-muted-foreground uppercase">
              Applied Intelligence Studio
            </p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          <NotificationsPopover
            trigger={
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <Bell className="h-3.5 w-3.5" />
                Get notifications
              </button>
            }
          />

          {isLoading ? (
            <span className="px-3 py-1.5 text-xs text-muted-foreground">...</span>
          ) : isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  {user.profileImageUrl ? (
                    <img
                      src={user.profileImageUrl}
                      alt={displayName ?? ''}
                      className="h-5 w-5 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="h-3 w-3 text-primary" />
                    </div>
                  )}
                  <span className="max-w-[120px] truncate">{displayName}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 border-border bg-card">
                <div className="px-3 py-2">
                  <p className="text-xs font-semibold text-foreground truncate">{displayName}</p>
                  {user.email && (
                    <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>
                  )}
                </div>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem
                  onClick={logout}
                  className="text-xs text-muted-foreground cursor-pointer hover:text-foreground focus:text-foreground"
                >
                  <LogOut className="h-3.5 w-3.5 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button
              onClick={login}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogIn className="h-3.5 w-3.5" />
              Lab login
            </button>
          )}

          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <Moon className="h-3.5 w-3.5" />
          </button>

          <BetaTestersModal
            trigger={
              <button className="ml-2 px-4 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity">
                Beta Testers
              </button>
            }
          />
        </nav>

        <button
          className="md:hidden p-2 text-muted-foreground relative z-50"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="md:hidden relative z-40 border-t border-border bg-card px-4 py-3 flex flex-col gap-2 shadow-xl"
            >
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <NotificationsPopover
                  trigger={
                    <button className="flex w-full items-center gap-2 py-2 text-sm text-muted-foreground">
                      <Bell className="h-4 w-4" /> Get notifications
                    </button>
                  }
                />
              </motion.div>

              {!isLoading &&
                (isAuthenticated && user ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                      className="flex items-center gap-3 py-2 border-t border-border mt-1 pt-3"
                    >
                      {user.profileImageUrl ? (
                        <img
                          src={user.profileImageUrl}
                          alt=""
                          className="h-7 w-7 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-foreground">{displayName}</p>
                        {user.email && (
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        )}
                      </div>
                    </motion.div>
                    <motion.button
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      onClick={logout}
                      className="flex items-center gap-2 py-2 text-sm text-muted-foreground"
                    >
                      <LogOut className="h-4 w-4" /> Log out
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    onClick={login}
                    className="flex items-center gap-2 py-2 text-sm text-muted-foreground"
                  >
                    <LogIn className="h-4 w-4" /> Lab login
                  </motion.button>
                ))}

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
              >
                <BetaTestersModal
                  trigger={
                    <button className="w-full mt-1 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold text-center">
                      Beta Testers
                    </button>
                  }
                />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
