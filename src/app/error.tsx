'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // エラーをログに記録
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-4xl font-bold mb-4">エラーが発生しました</h2>
      <p className="text-gray-600 mb-8">
        申し訳ありませんが、予期せぬエラーが発生しました。
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          もう一度試す
        </button>
        <Link 
          href="/" 
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          ホームに戻る
        </Link>
      </div>
    </div>
  );
} 