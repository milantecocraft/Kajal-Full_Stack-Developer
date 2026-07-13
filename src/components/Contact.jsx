import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal, { SectionHeader } from './Reveal.jsx'
import { profile, contactForm } from '../data/content.js'

const inputClass =
  'w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-stone-400 transition focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none'

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold tracking-wide text-ink">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      {children}
    </label>
  )
}

function ContactForm() {
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    const data = Object.fromEntries(new FormData(form))
    if (data.botcheck) return // honeypot: silently drop bots
    delete data.botcheck

    setStatus('submitting')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: contactForm.accessKey,
          subject: `Portfolio inquiry from ${data.name} — ${data.service}`,
          from_name: 'Kajal Portfolio',
          ...data,
        }),
      })
      const json = await res.json()
      if (json.success) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex h-full min-h-[380px] flex-col items-center justify-center rounded-2xl bg-white p-8 text-center"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl"
        >
          ✅
        </motion.span>
        <h3 className="mt-4 font-display text-xl font-bold text-ink">
          Message sent!
        </h3>
        <p className="mt-2 max-w-xs text-sm text-muted">
          Thanks for reaching out — Kajal will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink"
        >
          Send another message
        </button>
      </motion.div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 sm:p-8"
      noValidate={false}
    >
      {/* Honeypot — hidden from humans */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" required>
          <input
            type="text"
            name="name"
            required
            placeholder="Jane Founder"
            className={inputClass}
          />
        </Field>
        <Field label="Email" required>
          <input
            type="email"
            name="email"
            required
            placeholder="jane@startup.com"
            className={inputClass}
          />
        </Field>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label="Company">
          <input
            type="text"
            name="company"
            placeholder="Startup Ltd (optional)"
            className={inputClass}
          />
        </Field>
        <Field label="What do you need?" required>
          <select name="service" required defaultValue={contactForm.subjects[0]} className={inputClass}>
            {contactForm.subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Tell me about your project" required>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="What are you building, where are you stuck, and when do you need it live?"
            className={`${inputClass} resize-none`}
          />
        </Field>
      </div>

      <AnimatePresence>
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-xs font-medium text-red-600"
          >
            Something went wrong sending your message. Please try again, or email{' '}
            <a href={`mailto:${profile.email}`} className="underline">
              {profile.email}
            </a>{' '}
            directly.
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={status === 'submitting'}
        whileHover={status === 'submitting' ? {} : { scale: 1.02 }}
        whileTap={status === 'submitting' ? {} : { scale: 0.98 }}
        className="mt-6 w-full rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send message →'}
      </motion.button>

      <p className="mt-3 text-center text-[11px] text-stone-400">
        Usually replies within 24 hours · No spam, ever
      </p>
    </form>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Contact"
          title="Let's build something that scales."
        />

        <Reveal className="mt-14">
          <div className="relative overflow-hidden rounded-3xl bg-ink p-6 sm:p-10">
            {/* Glow accents */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-accent/40 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 right-1/4 h-64 w-64 rounded-full bg-amber-400/30 blur-3xl"
            />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
              {/* Info side */}
              <div className="flex flex-col justify-center">
                <p className="flex items-center gap-2 text-xs font-medium text-stone-400">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  {profile.availability} · {profile.location}
                </p>
                <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                  Navigating a high-stakes launch or a scaling bottleneck?
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-400 sm:text-base">
                  If you&apos;re a founder or engineering leader, let&apos;s explore an
                  intervention — a direct conversation, no layers in between.
                </p>

                <div className="mt-8 space-y-3">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-3 text-sm font-medium text-white transition-colors hover:text-accent"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                      📩
                    </span>
                    {profile.email}
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm font-medium text-white transition-colors hover:text-accent"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                      💼
                    </span>
                    linkedin.com/in/kajalgondaliya
                  </a>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm font-medium text-white transition-colors hover:text-accent"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                      🐙
                    </span>
                    github.com/kajalgondaliya
                  </a>
                </div>
              </div>

              {/* Form side */}
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
