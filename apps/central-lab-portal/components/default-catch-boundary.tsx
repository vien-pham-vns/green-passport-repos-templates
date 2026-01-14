"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export interface DefaultCatchBoundaryProps {
  error: Error & { digest?: string };
  reset?: () => void;
}

export function DefaultCatchBoundary({ error, reset }: DefaultCatchBoundaryProps) {
  const router = useRouter();

  console.error(error);

  return (
    <div className="min-w-0 flex-1 p-4 flex flex-col items-center justify-center gap-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
          Something went wrong!
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {error.message || "An unexpected error occurred"}
        </p>
        {error.digest && (
          <p className="text-sm text-gray-500">Error ID: {error.digest}</p>
        )}
      </div>
      <div className="flex gap-2 items-center flex-wrap">
        <button
          onClick={() => {
            if (reset) {
              reset();
            } else {
              router.refresh();
            }
          }}
          className="px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold"
        >
          Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
