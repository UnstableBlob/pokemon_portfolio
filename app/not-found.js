'use client';

import { redirect } from 'next/navigation';

/**
 * Global 404 handler that redirects any unmatched route back to the portfolio root.
 * With basePath: '/pokemon_portfolio' set in next.config.mjs, redirect('/') 
 * will automatically point to the correct URL.
 */
export default function NotFound() {
  redirect('/');
  return null;
}
