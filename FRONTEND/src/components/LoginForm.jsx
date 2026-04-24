import { useState } from 'react';
import { loginUser } from '../api/user.api';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/authSlice.js';
import { useNavigate } from '@tanstack/react-router';

const LoginForm = ({ state }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await loginUser(password, email);
            dispatch(login(data.user))
            navigate({to:"/dashboard"})
            setLoading(false);
            console.log("signin success")
        } catch (err) {
            setLoading(false);
            setError(err.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-semibold tracking-tight text-white">Sign in</h2>
                </div>

                {error && (
                    <div className="mb-5 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                        {error}
                    </div>
                )}

                <div className="mb-5">
                    <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-4 focus:ring-cyan-400/10"
                        id="email"
                        type="email"
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-4 focus:ring-cyan-400/10"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                    />
                </div>

                <div className="flex items-center justify-between gap-3">
                    <button
                        className={`inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 px-4 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 ${loading ? 'cursor-not-allowed opacity-60' : ''}`}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </div>

                <div className="mt-5 text-center">
                    <p className="text-sm text-slate-400">
                        Need an account? <button type="button" onClick={() => state(false)} className="text-cyan-300 transition hover:text-cyan-200">Register</button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;