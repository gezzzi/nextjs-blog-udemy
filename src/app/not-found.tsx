import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-4xl font-bold mb-4">404 - ページが見つかりません</h2>
      <p className="text-gray-600 mb-8">
        申し訳ありませんが、お探しのページは存在しないようです。
      </p>
      <Link 
        href="/" 
        className="text-blue-500 hover:text-blue-700 underline"
      >
        ホームに戻る
      </Link>
    </div>
  );
} 