import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile, navLinks } from '../data/content.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
        <nav className="flex items-center justify-between rounded-2xl border border-line bg-white/80 px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur-md sm:px-5">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink font-display text-sm font-bold text-white">
              KG
            </span>
            <span className="hidden font-display text-[15px] font-semibold tracking-tight sm:block">
              {profile.shortName}
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:bg-stone-100 hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <motion.a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent md:inline-flex"
            >
              Let&apos;s talk
              <span aria-hidden>↗</span>
            </motion.a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border border-line md:hidden"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-5 bg-ink"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-5 bg-ink"
              />
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="mt-2 overflow-hidden rounded-2xl border border-line bg-white/95 shadow-lg backdrop-blur-md md:hidden"
            >
              <ul className="flex flex-col p-3">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-3 text-sm font-medium text-ink hover:bg-stone-100"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
                <li className="mt-2 border-t border-line pt-3">
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-full bg-ink px-4 py-3 text-center text-sm font-semibold text-white"
                  >
                    Let&apos;s talk ↗
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
