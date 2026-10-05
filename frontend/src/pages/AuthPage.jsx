import React, { useState } from 'react';
import {
  Sparkles,
  Lock,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  CalendarDays,
  Check,
  BookOpen,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI status
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validations
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setError('Please enter your email address.');
      return;
    }
    if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    if (isRegister) {
      if (!name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (password.length < 8) {
        setError('Password must be at least 8 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      setSubmitting(true);
      try {
        await register({
          name: name.trim(),
          email: cleanEmail,
          password,
          confirmPassword,
        });
      } catch (err) {
        setError(err.message || 'Registration failed. Please try again.');
      } finally {
        setSubmitting(false);
      }
    } else {
      setSubmitting(true);
      try {
        await login(cleanEmail, password);
      } catch (err) {
        setError(err.message || 'Invalid email or password.');
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className="auth-screen min-h-screen w-full flex items-center justify-center p-4 bg-slate-950 text-slate-100 relative overflow-hidden font-sans">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-900 dark:bg-brand-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="auth-layout w-full max-w-6xl relative z-10 animate-in fade-in zoom-in-95 duration-300">
        <section className="auth-showcase" aria-label="MindMate workspace preview">
          <div className="auth-showcase-brand">
            <span className="auth-showcase-mark"><Sparkles className="w-5 h-5" /></span>
            <span>MindMate</span>
            <span className="auth-showcase-edition">PERSONAL WORKSPACE</span>
          </div>

          <div className="auth-showcase-copy">
            <div className="auth-eyebrow"><span /> SPACE TO THINK CLEARLY</div>
            <h2>Make room for<br />your <em>best work.</em></h2>
            <p>Bring your studies, schedule and goals together in one calm, considered space.</p>
          </div>

          <div className="auth-preview">
            <div className="auth-preview-topline">
              <div>
                <span className="auth-preview-kicker">YOUR DAY, IN FOCUS</span>
                <strong>A little more clarity.</strong>
              </div>
              <span className="auth-preview-date">MON, 24</span>
            </div>
            <div className="auth-preview-task">
              <span className="auth-preview-check"><Check className="w-3 h-3" /></span>
              <span><strong>Review lecture notes</strong><small>Biology · 25 min</small></span>
              <span className="auth-preview-done">DONE</span>
            </div>
            <div className="auth-preview-task">
              <span className="auth-preview-check is-pending" />
              <span><strong>Prepare for your quiz</strong><small>Statistics · 45 min</small></span>
              <span className="auth-preview-next">NEXT</span>
            </div>
            <div className="auth-preview-progress">
              <div><span>Daily momentum</span><strong>68%</strong></div>
              <span className="auth-preview-track"><i /></span>
            </div>
          </div>

          <div className="auth-showcase-benefits">
            <div><CalendarDays /><span>Plan with intention</span></div>
            <div><BookOpen /><span>Study with focus</span></div>
            <div><Sparkles /><span>Let AI help you</span></div>
          </div>

          <div className="auth-showcase-footer">
            <span>Designed for a more balanced student life</span>
            <span className="auth-showcase-dots"><i /><i /><i /></span>
          </div>
        </section>

        <div className="auth-form-column">
        {/* Brand Header */}
        <div className="auth-form-heading text-center mb-8">
          <div className="auth-brand-mark inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-tr from-brand-600 to-violet-500 shadow-sm shadow-brand-600/30 mb-4 border border-brand-400/20">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
            {isRegister ? 'Start fresh.' : 'Welcome back.'}
          </h1>
          <p className="text-sm text-slate-400 max-w-xs mx-auto">
            {isRegister
              ? 'Create your account and make space for what matters.'
              : 'Your personal space for focus, progress and balance.'}
          </p>
        </div>

        {/* Card */}
        <div className="auth-card bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-xl p-8 shadow-md shadow-black/40">
          {/* Mode Switch Tabs */}
          <div className="flex p-1 bg-slate-950/80 rounded-xl border border-slate-800 mb-6">
            <button
              type="button"
              id="tab-login-btn"
              onClick={() => {
                setIsRegister(false);
                setError('');
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                !isRegister
                  ? 'bg-slate-900 dark:bg-brand-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              MindMate Login
            </button>
            <button
              type="button"
              id="tab-register-btn"
              onClick={() => {
                setIsRegister(true);
                setError('');
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                isRegister
                  ? 'bg-slate-900 dark:bg-brand-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2.5 text-xs text-red-400 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field (Register only) */}
            {isRegister && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="register-name-input"
                    type="text"
                    required
                    placeholder="Varun"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Email field */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="auth-email-input"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Password {isRegister && <span className="text-slate-500">(minimum 8 characters)</span>}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="auth-password-input"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                />
              </div>
            </div>

            {/* Confirm Password (Register only) */}
            {isRegister && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <ShieldCheck className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="register-confirm-password-input"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              id="auth-submit-btn"
              type="submit"
              disabled={submitting}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white font-medium text-sm shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {submitting ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : isRegister ? (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Login</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle Link */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
            {isRegister ? (
              <p className="text-xs text-slate-400">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(false);
                    setError('');
                  }}
                  className="text-brand-400 hover:text-brand-300 font-semibold cursor-pointer ml-1"
                >
                  MindMate Login
                </button>
              </p>
            ) : (
              <p className="text-xs text-slate-400">
                Don't have an account?{' '}
                <button
                  type="button"
                  id="link-create-account"
                  onClick={() => {
                    setIsRegister(true);
                    setError('');
                  }}
                  className="text-brand-400 hover:text-brand-300 font-semibold cursor-pointer ml-1"
                >
                  Create a new account
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center mt-6 text-xs text-slate-500">
          <span className="auth-secure-note"><ShieldCheck className="w-3.5 h-3.5" /> Your personal workspace, kept secure</span>
        </div>
      </div>
      </div>
    </div>
  );
}
