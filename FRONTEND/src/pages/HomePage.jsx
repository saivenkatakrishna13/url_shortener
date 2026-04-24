
import { Link } from '@tanstack/react-router'
import { useSelector } from 'react-redux'
import UrlForm from '../components/UrlForm'

const HomePage = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  const highlights = [
    {
      label: 'Fast',
      value: 'Instant',
    },
    {
      label: 'Brand',
      value: 'Branded',
    },
    {
      label: 'Track',
      value: 'Tracked',
    },
  ]

  return (
    <section className="grid gap-12 xl:grid-cols-[1fr_1.08fr] xl:items-start">
      <div className="space-y-8 pt-4 lg:pt-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100">
          <span className="h-2 w-2 rounded-full bg-cyan-300" />
          Link tools
        </div>

        <div className="max-w-2xl space-y-4">
          <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
            Short links, without the clutter.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-slate-300">
            Shorten, brand, and track links in one calm workspace.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to={isAuthenticated ? '/dashboard' : '/auth'}
            className="rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5"
          >
            {isAuthenticated ? `Open ${user?.name || 'workspace'}` : 'Start now'}
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.label}
              className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-slate-950/20 backdrop-blur"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{item.label}</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{item.value}</h3>
            </article>
          ))}
        </div>
      </div>

      <div id="shorten" className="relative pt-2 xl:pt-10">
        <div className="absolute inset-x-8 top-0 -z-10 h-28 rounded-full bg-cyan-400/15 blur-3xl" />
        <UrlForm />
      </div>
    </section>
  )
}

export default HomePage