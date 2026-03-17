'use client';

import { useSignIn, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function GatePage() {
  const { isSignedIn, isLoaded } = useAuth();
  const { signIn, fetchStatus } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn) router.push('/dashboard');
  }, [isLoaded, isSignedIn, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: pwError } = await signIn.password({ password, identifier: email });
    if (pwError) {
      setError(pwError.message ?? 'Authentication failed.');
      setLoading(false);
      return;
    }

    const { error: finalizeError } = await signIn.finalize();
    if (finalizeError) {
      setError(finalizeError.message ?? 'Failed to complete sign-in.');
    }
    setLoading(false);
  }

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-8"
      style={{ backgroundColor: '#04080A', fontFamily: "'Space Mono', monospace" }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at center, rgba(200,168,75,0.05) 0%, transparent 65%)' }}
      />

      {/* Logo mark */}
      <div className="relative z-10 mb-14 flex flex-col items-center">
        <div className="w-20 h-20 mb-10 relative flex items-center justify-center">
          <div className="absolute inset-0 rotate-45" style={{ border: '1px solid rgba(200,168,75,0.2)' }} />
          <div className="w-12 h-12 flex items-center justify-center" style={{ border: '2px solid #C8A84B' }}>
            <div className="w-2 h-2" style={{ backgroundColor: '#C8A84B' }} />
          </div>
        </div>

        <h1
          className="font-black uppercase"
          style={{
            fontFamily: "'Unbounded', sans-serif",
            fontSize: 'clamp(3.5rem, 10vw, 7rem)',
            color: '#F7F3EC',
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          ZUNGU
        </h1>

        <div
          className="flex items-center gap-5 uppercase font-bold text-[11px] mt-2"
          style={{ color: '#C8A84B', letterSpacing: '0.4em' }}
        >
          <span>Navy Island</span>
          <div className="w-1 h-1 rotate-45" style={{ backgroundColor: '#C45A2A' }} />
          <span>MMXXVII</span>
        </div>
      </div>

      {/* Form container */}
      <div
        className="relative z-10 w-full max-w-[360px]"
        style={{ border: '1px solid rgba(200,168,75,0.15)', backgroundColor: '#0D2018' }}
      >
        {/* Top rule */}
        <div className="h-px w-full" style={{ backgroundColor: '#C8A84B', opacity: 0.4 }} />

        <div className="px-8 py-10">
          {/* Section label */}
          <p
            className="text-[9px] uppercase font-bold mb-8 text-center"
            style={{ color: '#C8A84B', letterSpacing: '0.45em' }}
          >
            Sponsor Access
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label
                className="text-[9px] uppercase font-bold"
                style={{ color: 'rgba(242,235,217,0.45)', letterSpacing: '0.35em' }}
              >
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-xs py-2 border-b"
                style={{
                  color: '#F2EBD9',
                  borderColor: 'rgba(242,235,217,0.15)',
                  fontFamily: "'Space Mono', monospace",
                  letterSpacing: '0.05em',
                }}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label
                className="text-[9px] uppercase font-bold"
                style={{ color: 'rgba(242,235,217,0.45)', letterSpacing: '0.35em' }}
              >
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-xs py-2 border-b"
                style={{
                  color: '#F2EBD9',
                  borderColor: 'rgba(242,235,217,0.15)',
                  fontFamily: "'Space Mono', monospace",
                  letterSpacing: '0.1em',
                }}
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-[9px] uppercase" style={{ color: '#C45A2A', letterSpacing: '0.2em' }}>
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || fetchStatus === 'fetching'}
              className="mt-2 w-full py-3 text-[10px] uppercase font-bold transition-all"
              style={{
                fontFamily: "'Space Mono', monospace",
                letterSpacing: '0.35em',
                color: loading ? 'rgba(200,168,75,0.4)' : '#04080A',
                backgroundColor: loading ? 'transparent' : '#C8A84B',
                border: '1px solid #C8A84B',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Verifying...' : 'Enter'}
            </button>
          </form>
        </div>

        {/* Bottom rule */}
        <div className="h-px w-full" style={{ backgroundColor: 'rgba(200,168,75,0.1)' }} />
      </div>

      {/* Footer */}
      <p
        className="relative z-10 mt-8 text-[9px] uppercase"
        style={{ color: 'rgba(107,99,85,0.5)', letterSpacing: '0.3em' }}
      >
        Authorized personnel only
      </p>
    </div>
  );
}
