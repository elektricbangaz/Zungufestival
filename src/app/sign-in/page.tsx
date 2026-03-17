'use client';

import { useSignIn, useAuth } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';

const ROLES = {
  investor: {
    icon: '◈',
    label: 'Investor Access',
    accent: '#C8A84B',
    badgeBorder: 'rgba(200,168,75,0.35)',
    heading: 'Brand Strategy\n& Capital Model',
    desc: 'Full access to financial projections, three-scenario stress testing, and the Zungu investment thesis.',
    items: [
      'Brand & Cultural Strategy',
      'Financial Model & Projections',
      'Master Development Schedule',
      'Operational Infrastructure',
      'Global Partnership Framework',
    ],
    switchText: 'Signing in as a partner?',
    switchRole: 'partner' as const,
    redirect: '/deck',
    submitClass: '#C8A84B',
  },
  partner: {
    icon: '◎',
    label: 'Partner Access',
    accent: '#4AAFA0',
    badgeBorder: 'rgba(74,175,160,0.35)',
    heading: 'Stage Operations\n& Partnership Deck',
    desc: 'Stage layout, activity programme, vendor architecture, and partnership opportunities.',
    items: [
      'Stage Placement & Site Map',
      'Activity Programme 2027',
      'Food Village & Vendor Brief',
      'Production Consortium Overview',
      'Partnership & CTA',
    ],
    switchText: 'Signing in as an investor?',
    switchRole: 'investor' as const,
    redirect: '/partner',
    submitClass: '#4AAFA0',
  },
} as const;

type RoleKey = keyof typeof ROLES;

function SignInContent() {
  const { isSignedIn, isLoaded } = useAuth();
  const { signIn, fetchStatus } = useSignIn();
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = (searchParams.get('role') ?? 'investor') as RoleKey;
  const [role, setRole] = useState<RoleKey>(roleParam === 'partner' ? 'partner' : 'investor');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const r = ROLES[role];

  useEffect(() => {
    if (isLoaded && isSignedIn) router.push(r.redirect);
  }, [isLoaded, isSignedIn, r.redirect, router]);

  function switchRole() {
    setRole(r.switchRole);
    setError('');
  }

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
    <div style={{
      backgroundColor: '#04080A',
      color: '#F2EBD9',
      fontFamily: "'Space Mono', monospace",
      minHeight: '100vh',
      display: 'flex',
      position: 'relative',
    }}>
      {/* Back button */}
      <button
        onClick={() => router.push('/')}
        style={{
          position: 'absolute', top: '20px', left: '24px', zIndex: 10,
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: "'Space Mono', monospace", fontSize: '9px',
          letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'rgba(242,235,217,0.4)',
          display: 'flex', alignItems: 'center', gap: '8px', padding: '8px',
        }}
      >
        ← Back
      </button>

      {/* Left panel */}
      <div style={{
        flex: '0 0 44%',
        background: `linear-gradient(135deg, #0D2018 0%, rgba(13,32,24,0.6) 100%)`,
        borderRight: `1px solid ${r.badgeBorder}`,
        padding: '80px 60px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        minHeight: '100vh',
      }}>
        <div>
          <div style={{
            fontFamily: "'Unbounded', sans-serif",
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 900, letterSpacing: '-0.02em',
            color: '#F7F3EC', marginBottom: '4px',
          }}>ZUNGU</div>
          <div style={{
            fontSize: '9px', letterSpacing: '0.4em',
            color: 'rgba(242,235,217,0.4)', textTransform: 'uppercase',
            marginBottom: '36px',
          }}>Navy Island &nbsp;·&nbsp; MMXXVII</div>

          {/* Role badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            border: `1px solid ${r.badgeBorder}`,
            padding: '8px 16px', marginBottom: '28px',
          }}>
            <span style={{ color: r.accent, fontSize: '14px' }}>{r.icon}</span>
            <span style={{
              fontSize: '9px', letterSpacing: '0.3em',
              color: r.accent, textTransform: 'uppercase',
            }}>{r.label}</span>
          </div>

          <h2 style={{
            fontFamily: "'Unbounded', sans-serif",
            fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: 700,
            lineHeight: 1.2, letterSpacing: '-0.02em',
            color: '#F7F3EC', marginBottom: '20px',
            whiteSpace: 'pre-line',
          }}>{r.heading}</h2>

          <p style={{
            fontSize: '12px', lineHeight: 1.8,
            color: 'rgba(242,235,217,0.5)', marginBottom: '32px',
            maxWidth: '380px',
          }}>{r.desc}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {r.items.map((item, i) => (
              <div key={i} style={{
                fontSize: '10px', letterSpacing: '0.15em',
                color: role === 'investor' ? 'rgba(200,168,75,0.7)' : 'rgba(74,175,160,0.7)',
                display: 'flex', alignItems: 'center', gap: '12px',
              }}>
                <span style={{ color: r.accent }}>—</span> {item}
              </div>
            ))}
          </div>
        </div>

        <div style={{ fontSize: '10px', color: 'rgba(242,235,217,0.3)', marginTop: '48px' }}>
          {r.switchText}{' '}
          <button
            onClick={switchRole}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: r.accent, fontSize: '10px',
              fontFamily: "'Space Mono', monospace",
            }}
          >Switch →</button>
        </div>
      </div>

      {/* Right panel */}
      <div style={{
        flex: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '80px 60px',
      }}>
        <div style={{ width: '100%', maxWidth: '360px' }}>
          <div style={{
            display: 'flex', justifyContent: 'center', marginBottom: '48px',
          }}>
            <Image src="/logo-z.png" alt="Z" width={56} height={56} style={{ opacity: 0.7 }} />
          </div>

          <p style={{
            fontSize: '9px', letterSpacing: '0.45em',
            color: 'rgba(242,235,217,0.35)', textTransform: 'uppercase',
            textAlign: 'center', marginBottom: '36px',
          }}>Restricted Access</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '9px', letterSpacing: '0.35em',
                color: 'rgba(242,235,217,0.4)', textTransform: 'uppercase',
                marginBottom: '8px',
              }}>Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  width: '100%', background: 'transparent',
                  border: 'none', borderBottom: '1px solid rgba(242,235,217,0.15)',
                  color: '#F2EBD9', fontSize: '12px', padding: '8px 0',
                  outline: 'none',
                  fontFamily: "'Space Mono', monospace",
                  letterSpacing: '0.05em',
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '9px', letterSpacing: '0.35em',
                color: 'rgba(242,235,217,0.4)', textTransform: 'uppercase',
                marginBottom: '8px',
              }}>Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%', background: 'transparent',
                  border: 'none', borderBottom: '1px solid rgba(242,235,217,0.15)',
                  color: '#F2EBD9', fontSize: '12px', padding: '8px 0',
                  outline: 'none',
                  fontFamily: "'Space Mono', monospace",
                  letterSpacing: '0.1em',
                }}
              />
            </div>

            {error && (
              <p style={{ fontSize: '9px', color: '#C45A2A', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || fetchStatus === 'fetching'}
              style={{
                width: '100%', padding: '14px',
                fontFamily: "'Space Mono', monospace",
                fontSize: '10px', letterSpacing: '0.35em',
                textTransform: 'uppercase', fontWeight: 700,
                background: loading ? 'transparent' : r.accent,
                color: loading ? r.accent : '#04080A',
                border: `1px solid ${r.accent}`,
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '8px',
              }}
            >
              {loading ? 'Verifying...' : 'Enter →'}
            </button>
          </form>

          <p style={{
            marginTop: '24px', fontSize: '9px',
            color: 'rgba(107,99,85,0.5)', letterSpacing: '0.2em',
            textAlign: 'center',
          }}>By invitation only</p>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInContent />
    </Suspense>
  );
}
