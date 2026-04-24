import { useSelector } from 'react-redux'
import UrlForm from '../components/UrlForm'
import UserUrl from '../components/UserUrl'

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth)

  const insights = [
    {
      title: 'Links',
      value: '24/7',
    },
    {
      title: 'Clicks',
      value: '30s',
    },
    {
      title: 'Best',
      value: 'Fast',
    },
  ]

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Hi, {user?.name || 'creator'}.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Manage links and clicks from one screen.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:w-[32rem]">
            {insights.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left shadow-lg shadow-slate-950/20"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{item.title}</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">{item.value}</h2>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(28rem,0.95fr)_minmax(0,1.05fr)]">
        <div className="space-y-6">
          <section className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
            <UrlForm/>
          </section>
        </div>

        <UserUrl/>
      </div>
    </section>
  )
}

export default DashboardPage