import { profile, navLinks } from '../data/content.js'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink font-display text-xs font-bold text-white">
            KG
          </span>
          <span className="text-sm text-muted">
            © {new Date().getFullYear()} {profile.name} · {profile.pronouns}
          </span>
        </div>
        <ul className="flex flex-wrap items-center justify-center gap-4">
          {navLinks.slice(1).map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-xs font-medium text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-muted transition-colors hover:text-ink"
            >
              LinkedIn ↗
            </a>
          </li>
          <li>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-muted transition-colors hover:text-ink"
            >
              GitHub ↗
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
