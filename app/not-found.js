'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';

/**
 * Global 404 handler that redirects any unmatched route back to the portfolio root.
 * With basePath: '/pokemon_portfolio' set in next.config.mjs, redirect('/') 
 * will automatically point to the correct URL.
 */
export default function NotFound() {
  useEffect(() => {
    // Small delay to ensure the router is ready, or immediate redirect
    redirect('/');
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#000',
      color: '#fff',
      fontFamily: 'monospace',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1>404 - PAGE NOT FOUND</h1>
      <p>Redirecting you back to the portfolio...</p>
      <a href="/pokemon_portfolio/" style={{ color: '#ff0000', marginTop: '20px' }}>
        Click here if you are not redirected
      </a>
    </div>
  );
}
