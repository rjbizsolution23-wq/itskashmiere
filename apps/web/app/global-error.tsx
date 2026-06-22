'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-black text-white">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Something went wrong!</h2>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-[#d4af37] text-black font-semibold rounded-full hover:opacity-90 transition-all"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
