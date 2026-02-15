"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Something went wrong!</h2>
        <button
          onClick={reset}
          className="inline-block px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
