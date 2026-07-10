import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion'
import { profile } from '../data/content.js'

const acts = [
  { n: '01', label: 'The idea' },
  { n: '02', label: 'The MVP' },
  { n: '03', label: 'The scale' },
]

function Counter({ progress, to, suffix, label, range }) {
  const raw = useTransform(progress, range, [0, to])
  const value = useTransform(raw, (v) => Math.round(v) + suffix)
  return (
    <div className="flex flex-col items-center">
      <motion.span className="font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl">
        {value}
      </motion.span>
      <span className="mt-1 max-w-[9rem] text-[11px] leading-snug text-muted sm:text-xs">
        {label}
      </span>
    </div>
  )
}

export default function StoryHero() {
  const ref = useRef(null)
  const [act, setAct] = useState(0)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setAct(v < 0.32 ? 0 : v < 0.65 ? 1 : 2)
  })

  /* ---- Act 1 : the idea (visible on load, exits) ---- */
  const act1Opacity = useTransform(scrollYProgress, [0.2, 0.3], [1, 0])
  const act1Y = useTransform(scrollYProgress, [0.2, 0.3], [0, -60])
  const sketchRotate = useTransform(scrollYProgress, [0, 0.3], [-3, 2])
  const scribble = useTransform(scrollYProgress, [0.02, 0.18], [0, 1])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0])

  /* ---- Act 2 : the MVP ---- */
  const act2Opacity = useTransform(
    scrollYProgress,
    [0.3, 0.4, 0.55, 0.65],
    [0, 1, 1, 0],
  )
  const act2Y = useTransform(
    scrollYProgress,
    [0.3, 0.4, 0.55, 0.65],
    [60, 0, 0, -60],
  )
  const codeLine = (i) =>
    useTransform(scrollYProgress, [0.36 + i * 0.025, 0.42 + i * 0.025], [0, 1])

  /* ---- Act 3 : the scale (enters, stays) ---- */
  const act3Opacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1])
  const act3Y = useTransform(scrollYProgress, [0.65, 0.75], [60, 0])
  const act3Pointer = useTransform(act3Opacity, (o) => (o > 0.5 ? 'auto' : 'none'))
  const bar = (i) =>
    useTransform(scrollYProgress, [0.68 + i * 0.03, 0.86 + i * 0.03], [0, 1])
  const ctaOpacity = useTransform(scrollYProgress, [0.82, 0.92], [0, 1])
  const barHeights = [24, 38, 32, 52, 64, 84]

  const codeLines = [
    { w: 'w-24', c: 'bg-violet-400' },
    { w: 'w-32', c: 'bg-sky-400' },
    { w: 'w-20', c: 'bg-emerald-400' },
    { w: 'w-28', c: 'bg-amber-400' },
    { w: 'w-16', c: 'bg-pink-400' },
  ]

  return (
    <section id="home" ref={ref} className="relative h-[420vh]">
      {/* Pinned stage */}
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Background grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(17,17,19,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,17,19,0.04)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,black,transparent)]"
        />

        {/* Act indicator */}
        <div className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-5 sm:left-8 md:flex">
          {acts.map((a, i) => (
            <div key={a.n} className="flex items-center gap-3">
              <span
                className={`font-display text-xs font-bold transition-colors duration-300 ${
                  act === i ? 'text-accent' : 'text-stone-300'
                }`}
              >
                {a.n}
              </span>
              <span
                className={`text-xs font-medium tracking-wide transition-all duration-300 ${
                  act === i ? 'text-ink' : 'text-stone-300'
                }`}
              >
                {a.label}
              </span>
            </div>
          ))}
        </div>

        {/* ============ ACT 1 — THE IDEA ============ */}
        <motion.div
          style={{ opacity: act1Opacity, y: act1Y }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase sm:text-sm">
            {profile.shortName} · {profile.role}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-3xl leading-tight font-bold tracking-tight text-ink sm:text-5xl md:text-6xl">
            Every great product
            <br />
            starts as a sketch.
          </h1>

          {/* Napkin wireframe */}
          <motion.div
            style={{ rotate: sketchRotate }}
            className="relative mt-10 w-[260px] sm:w-[340px]"
          >
            <div className="rounded-2xl border-2 border-dashed border-stone-400/80 bg-white/70 p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full border-2 border-dashed border-stone-400/80" />
                <span className="h-2 w-16 rounded-full border border-dashed border-stone-400/80" />
                <span className="ml-auto h-4 w-10 rounded-full border border-dashed border-stone-400/80" />
              </div>
              <div className="mt-4 h-20 rounded-xl border-2 border-dashed border-stone-400/80" />
              <div className="mt-3 space-y-2">
                <div className="h-2 w-3/4 rounded-full border border-dashed border-stone-400/80" />
                <div className="h-2 w-1/2 rounded-full border border-dashed border-stone-400/80" />
              </div>
              <div className="mt-4 flex gap-2">
                <span className="h-8 w-24 rounded-full border-2 border-dashed border-stone-400/80" />
                <span className="h-8 w-16 rounded-full border border-dashed border-stone-400/80" />
              </div>
            </div>

            {/* Scribbled annotation arrow */}
            <svg
              viewBox="0 0 120 80"
              className="absolute -right-16 -top-10 hidden h-20 w-28 text-stone-500 sm:block"
              fill="none"
            >
              <motion.path
                d="M110 8 C70 4, 40 18, 28 52 M28 52 l-4 -14 M28 52 l14 -6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ pathLength: scribble }}
              />
            </svg>
            <span className="absolute -right-24 -top-16 hidden -rotate-6 font-display text-sm font-semibold text-stone-500 italic sm:block">
              your idea
            </span>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            style={{ opacity: hintOpacity }}
            className="absolute bottom-8 flex flex-col items-center gap-2 text-[11px] font-medium tracking-[0.25em] text-muted uppercase"
          >
            Scroll the story
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden
            >
              ↓
            </motion.span>
          </motion.div>
        </motion.div>

        {/* ============ ACT 2 — THE MVP ============ */}
        <motion.div
          style={{ opacity: act2Opacity, y: act2Y }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase sm:text-sm">
            Weeks — not months
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight font-bold tracking-tight text-ink sm:text-5xl md:text-6xl">
            It becomes a
            <br />
            market-ready MVP.
          </h2>
          <p className="mt-4 max-w-md text-sm text-muted sm:text-base">
            Surgical scope. Clean architecture. Zero catastrophic tech debt.
          </p>

          {/* Real product mockup */}
          <div className="relative mt-10">
            <div className="w-[260px] overflow-hidden rounded-2xl border border-line bg-white shadow-2xl shadow-ink/10 sm:w-[340px]">
              <div className="flex items-center gap-1.5 border-b border-line bg-stone-50 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="ml-3 h-4 w-28 rounded-full bg-stone-200 text-[9px]" />
              </div>
              <div className="p-4 text-left">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-[9px] font-bold text-white">
                    K
                  </span>
                  <span className="h-2 w-16 rounded-full bg-stone-200" />
                  <span className="ml-auto rounded-full bg-accent px-2.5 py-1 text-[9px] font-semibold text-white">
                    Sign up
                  </span>
                </div>
                <div className="mt-4 flex h-20 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-amber-400 text-xs font-semibold text-white">
                  Launch day 🚀
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="h-12 rounded-lg bg-stone-100" />
                  <div className="h-12 rounded-lg bg-stone-100" />
                </div>
              </div>
            </div>

            {/* Code panel */}
            <div className="absolute -top-8 -right-14 hidden w-44 rounded-xl bg-ink p-3.5 text-left shadow-xl sm:block">
              <p className="mb-2 font-mono text-[10px] text-stone-400">api/mvp.js</p>
              <div className="space-y-2">
                {codeLines.map((line, i) => (
                  <motion.span
                    key={i}
                    style={{ scaleX: codeLine(i) }}
                    className={`block h-1.5 origin-left rounded-full ${line.w} ${line.c}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============ ACT 3 — THE SCALE ============ */}
        <motion.div
          style={{ opacity: act3Opacity, y: act3Y, pointerEvents: act3Pointer }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase sm:text-sm">
            Built to withstand user spikes
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight font-bold tracking-tight text-ink sm:text-5xl md:text-6xl">
            Then it scales —{' '}
            <span className="bg-gradient-to-r from-accent via-violet-500 to-amber-500 bg-clip-text text-transparent">
              without buckling.
            </span>
          </h2>

          {/* Growth bars */}
          <div className="mt-8 flex h-24 items-end gap-2 sm:h-28 sm:gap-3">
            {barHeights.map((h, i) => (
              <motion.div
                key={i}
                style={{ scaleY: bar(i), height: `${h}%` }}
                className="w-6 origin-bottom rounded-t-lg bg-gradient-to-t from-accent to-violet-400 sm:w-8"
              />
            ))}
          </div>

          {/* Counters */}
          <div className="mt-8 flex items-start gap-6 sm:gap-12">
            <Counter
              progress={scrollYProgress}
              to={7}
              suffix="+"
              label="Years of experience"
              range={[0.72, 0.88]}
            />
            <Counter
              progress={scrollYProgress}
              to={25}
              suffix="%"
              label="Faster operations with AI"
              range={[0.72, 0.88]}
            />
            <Counter
              progress={scrollYProgress}
              to={40}
              suffix="%"
              label="Fewer production bugs"
              range={[0.72, 0.88]}
            />
          </div>

          {/* Final CTAs */}
          <motion.div
            style={{ opacity: ctaOpacity }}
            className="mt-10 flex flex-col items-center gap-4"
          >
            <div className="flex flex-wrap items-center justify-center gap-3">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-ink/10 transition-colors hover:bg-accent"
              >
                View my work
              </motion.a>
              <motion.a
                href={`mailto:${profile.email}`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full border border-line bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink"
              >
                Let&apos;s build yours
              </motion.a>
            </div>
            <p className="flex items-center gap-2 text-xs text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {profile.availability} · {profile.location.split(',')[0]}, UK
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
