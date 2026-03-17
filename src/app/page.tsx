'use client';

import { SignIn, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function GatePage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/dashboard');
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-8 text-center"
      style={{ backgroundColor: '#04080A', fontFamily: "'Space Mono', monospace" }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at center, rgba(200,168,75,0.06) 0%, transparent 70%)' }}
      />

      {/* Logo */}
      <div className="relative z-10 mb-12 flex flex-col items-center">
        <div className="w-20 h-20 mb-10 relative flex items-center justify-center">
          <div className="absolute inset-0 rotate-45" style={{ border: '1px solid rgba(200,168,75,0.2)' }} />
          <div className="w-12 h-12 flex items-center justify-center" style={{ border: '2px solid #C8A84B' }}>
            <div className="w-2 h-2" style={{ backgroundColor: '#C8A84B' }} />
          </div>
        </div>

        <h1
          className="font-black tracking-tighter uppercase mb-2"
          style={{
            fontFamily: "'Unbounded', sans-serif",
            fontSize: 'clamp(3.5rem, 10vw, 7rem)',
            color: '#F7F3EC',
            lineHeight: 1,
          }}
        >
          ZUNGU
        </h1>

        <div
          className="flex items-center gap-5 uppercase font-bold text-[11px]"
          style={{ color: '#C8A84B', letterSpacing: '0.4em' }}
        >
          <span>Navy Island</span>
          <div className="w-1 h-1 rotate-45" style={{ backgroundColor: '#C45A2A' }} />
          <span>MMXXVII</span>
        </div>
      </div>

      {/* Access label */}
      <p
        className="relative z-10 text-[10px] uppercase font-bold italic mb-8"
        style={{ color: '#6B6355', letterSpacing: '0.35em' }}
      >
        // ACCESS AUTHORIZATION REQUIRED
      </p>

      {/* Clerk sign-in */}
      <div className="relative z-10 w-full max-w-sm">
        <SignIn
          appearance={{
            variables: {
              colorPrimary: '#C8A84B',
              colorBackground: '#0D2018',
              colorText: '#F2EBD9',
              colorInputBackground: '#04080A',
              fontFamily: 'Space Mono, monospace',
              borderRadius: '0px',
            },
            elements: {
              card: {
                border: '1px solid rgba(200,168,75,0.2)',
                boxShadow: 'none',
              },
              headerTitle: { display: 'none' },
              headerSubtitle: { display: 'none' },
              socialButtonsBlockButton: { display: 'none' },
              dividerRow: { display: 'none' },
            },
          }}
        />
      </div>
    </div>
  );
}
