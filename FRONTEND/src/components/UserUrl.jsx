import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllUserUrls } from '../api/user.api'
import { deleteShortUrl } from '../api/shortUrl.api'
import { queryClient } from '../main'

const UserUrl = () => {
  const { data: urls, isLoading, isError, error } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUserUrls,
    refetchInterval: 30000, // Refetch every 30 seconds to update click counts
    staleTime: 0, // Consider data stale immediately so it refetches when invalidated
  })
  const [copiedId, setCopiedId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const handleCopy = async (url, id) => {
    await navigator.clipboard.writeText(url)
    setCopiedId(id)

    setTimeout(() => {
      setCopiedId(null)
    }, 2000)
  }

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm('Delete this link?')

    if (!shouldDelete) {
      return
    }

    try {
      setDeletingId(id)
      await deleteShortUrl(id)
      queryClient.invalidateQueries({ queryKey: ['userUrls'] })
    } catch (err) {
      console.error('Delete failed:', err)
    } finally {
      setDeletingId(null)
    }
  }

  const userUrls = [...(urls?.urls ?? [])].reverse()
  const totalClicks = userUrls.reduce((sum, item) => sum + (item.clicks || 0), 0)
  const topUrl = userUrls.reduce((best, item) => {
    if (!best) {
      return item
    }

    return (item.clicks || 0) > (best.clicks || 0) ? item : best
  }, null)
  const baseUrl = 'http://localhost:3000'

  if (isLoading) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
        <div className="flex items-center gap-3 text-slate-300">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-cyan-400/30 border-t-cyan-300" />
          Syncing your link analytics...
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-[2rem] border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-rose-100 shadow-2xl shadow-slate-950/30">
        Error loading your URLs: {error.message}
      </div>
    )
  }

  if (!userUrls.length) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-8 text-center shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-cyan-300">
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <p className="mt-5 text-xl font-semibold text-white">No links yet</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">Create one above.</p>
      </div>
    )
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-xl sm:p-8">
      <div className="flex flex-col gap-6 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Links</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Your short links</h2>
          <p className="mt-2 text-sm text-slate-400">Recent links, clicks, and quick copy actions.</p>
        </div>

        <div className="grid w-full min-w-0 gap-3 sm:grid-cols-3 lg:max-w-[22rem]">
          {[
            { label: 'Links', value: userUrls.length },
            { label: 'Clicks', value: totalClicks },
            { label: 'Top', value: topUrl ? `${topUrl.clicks || 0}` : '—' },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-3 shadow-lg shadow-slate-950/20">
              <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">{item.label}</p>
              <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {userUrls.map((url) => {
          const shortLink = `${baseUrl}/${url.short_url}`

          return (
            <article
              key={url._id}
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-5 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:border-cyan-400/30"
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-cyan-300 via-sky-400 to-emerald-400" />
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1.45fr)_auto] lg:items-center">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-cyan-300/80" />
                    Source
                  </div>
                  <p className="mt-3 break-words text-sm leading-6 text-white/90" title={url.full_url}>
                    {url.full_url}
                  </p>
                  <a
                    href={shortLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-4 py-2 text-sm text-cyan-100 transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
                  >
                    <span className="truncate">{shortLink}</span>
                  </a>
                </div>

                <div className="flex items-center gap-3 lg:flex-col lg:items-end">
                  <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                    {url.clicks} {url.clicks === 1 ? 'click' : 'clicks'}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(shortLink, url._id)}
                      className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold transition ${
                        copiedId === url._id
                          ? 'bg-white text-slate-950'
                          : 'bg-slate-950 text-white hover:bg-slate-900'
                      }`}
                    >
                      {copiedId === url._id ? 'Copied' : 'Copy link'}
                    </button>
                    <button
                      onClick={() => handleDelete(url._id)}
                      disabled={deletingId === url._id}
                      className="inline-flex items-center rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-100 transition hover:border-rose-400 hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {deletingId === url._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default UserUrl