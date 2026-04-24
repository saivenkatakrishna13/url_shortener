import { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const AuthPage = () => {

    const [login, setLogin] = useState(true)

    return (
        <section className="grid min-h-[calc(100vh-8rem)] gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
            <aside className="flex flex-col justify-between rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl lg:p-10">
                <div className="space-y-8">
                    <div className="max-w-2xl space-y-4">
                        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                            Sign in to continue.
                        </h1>
                        <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                            Manage links and clicks from one place.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        {[
                            'Custom slugs',
                            'Live stats',
                            'Fast copy',
                        ].map((title) => (
                            <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="text-sm font-semibold text-white">{title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>

            <div className="flex items-center justify-center">
                {login ? <LoginForm state={setLogin} /> : <RegisterForm state={setLogin} />}
            </div>
        </section>
    )
}

export default AuthPage