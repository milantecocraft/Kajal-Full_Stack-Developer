import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import { profile } from '../data/content.js'

export default function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-16 text-center sm:px-12 sm:py-20">
            {/* Glow accents */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-accent/40 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 right-1/4 h-64 w-64 rounded-full bg-amber-400/30 blur-3xl"
            />

            <div className="relative">
              <p className="flex items-center justify-center gap-2 text-xs font-medium text-stone-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {profile.availability} · {profile.location}
              </p>
              <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                Navigating a high-stakes launch or a scaling bottleneck?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-stone-400 sm:text-base">
                If you&apos;re a founder or engineering leader, let&apos;s explore an
                intervention — a direct conversation, no layers in between.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <motion.a
                  href={`mailto:${profile.email}`}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-stone-200"
                >
                  📩 {profile.email}
                </motion.a>
                <motion.a
                  href="#home"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white"
                >
                  Back to top ↑
                </motion.a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
