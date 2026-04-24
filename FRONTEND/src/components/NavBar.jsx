import { Link, useNavigate } from '@tanstack/react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction } from '../store/slice/authSlice';
import { logoutUser } from '../api/user.api';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      dispatch(logoutAction());
      navigate({ to: '/' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link to="/" className="group flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-400 to-emerald-400 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition duration-300 group-hover:scale-105">
              U
            </span>
            <span className="space-y-0.5">
              <span className="block text-base font-semibold tracking-tight text-white sm:text-lg">
                URL Shortener
              </span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-white sm:inline-flex"
              >
                Dashboard
              </Link>
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 text-xs font-semibold text-slate-950">
                  {(user?.name || 'U').slice(0, 1).toUpperCase()}
                </div>
                <span className="hidden text-sm text-slate-200 sm:block">
                  {user?.name || 'Creator'}
                </span>
                <button
                  onClick={handleLogout}
                  className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/auth"
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-white"
              >
                Sign in
              </Link>
            </>
          )}
          </div>
        </div>
    </nav>
  );
};

export default Navbar;