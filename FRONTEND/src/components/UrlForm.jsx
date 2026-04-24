import { useState } from 'react'
import { createShortUrl } from '../api/shortUrl.api'
import { useSelector } from 'react-redux'
import { queryClient } from '../main'

const UrlForm = () => {
  
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const [customSlug, setCustomSlug] = useState('')
  const [loading, setLoading] = useState(false)
  const {isAuthenticated} = useSelector((state) => state.auth)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!url.trim()) {
      setError('Add a URL to shorten first.')
      return
    }

    setLoading(true)

    try{
      const nextShortUrl = await createShortUrl(url.trim(), customSlug.trim())
      setShortUrl(nextShortUrl)
      queryClient.invalidateQueries({queryKey: ['userUrls']})
      setError('')
      setCopied(false)
    }catch(err){
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!shortUrl) {
      return
    }

    await navigator.clipboard.writeText(shortUrl)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div className="w-full rounded-[2rem] border border-white/10 bg-slate-950/70 p-7 shadow-2xl shadow-slate-950/40 backdrop-blur-xl sm:p-10">
      <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Shorten</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Create a short URL.</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-slate-200">
            Destination URL
          </label>
          <div className="relative mt-2">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-500">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.657-5.657l1.415-1.414" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 115.657 5.657l-1.414 1.414" />
              </svg>
            </span>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://example.com/your-long-campaign-link"
              required
              className="min-h-[3.75rem] w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-5 pl-12 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-4 focus:ring-cyan-400/10"
            />
          </div>
        </div>

        {isAuthenticated && (
          <div>
            <label htmlFor="customSlug" className="block text-sm font-medium text-slate-200">
              Custom slug <span className="text-slate-500">optional</span>
            </label>
            <input
              type="text"
              id="customSlug"
              value={customSlug}
              onChange={(event) => setCustomSlug(event.target.value)}
              placeholder="launch-week, spring-sale, product-demo"
              className="mt-2 min-h-[3.75rem] w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-4 focus:ring-cyan-400/10"
            />
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 px-4 py-4 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Shortening...' : 'Shorten'}
          <svg className="h-4 w-4 transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0-5 5m5-5H6" />
          </svg>
        </button>
      </form>

      {shortUrl && (
        <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block break-all text-sm font-medium text-white transition hover:text-cyan-200"
            >
              {shortUrl}
            </a>
            <button
              onClick={handleCopy}
              className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition ${
                copied
                  ? 'bg-white text-slate-950'
                  : 'bg-slate-950 text-white hover:bg-slate-900'
              }`}
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UrlForm