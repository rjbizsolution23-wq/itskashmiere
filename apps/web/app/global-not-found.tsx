'use client';

import React from 'react';

export default function GlobalNotFound() {
  return (
    <html>
      <body className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-black text-white">
        <h2 className="text-2xl font-bold text-[#d4af37] mb-2">Page Not Found</h2>
        <p className="text-gray-400 mb-6 text-sm">The page you are looking for does not exist.</p>
        <a
          href="/"
          className="px-5 py-2.5 bg-[#d4af37] text-black text-sm font-semibold rounded-full hover:opacity-90 transition-all"
        >
          Go Home
        </a>
      </body>
    </html>
  );
}
