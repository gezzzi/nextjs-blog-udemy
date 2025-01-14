import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '../../lib/post';

export default async function Home() {
  const posts = getAllPosts();

  return (
    <div className="flex flex-col items-center">
      <p className="mb-12 text-center">
        私は駆け出しエンジニアです/Next.jsでブログサイトを作成してみました/副業についての情報を発信していきます
      </p>
      <section>
        <h2 className="text-center text-2xl font-bold mb-8">📝  副業のブログ</h2>
        <div className="grid grid-cols-2 gap-8 mt-4">
          {posts.map((post) => (
            <article key={post.id} className="flex flex-col gap-2">
              <Link href={`/posts/${post.id}`} className="overflow-hidden">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
              </Link>
              <Link href={`/posts/${post.id}`} className="font-medium hover:underline">
                {post.title}
              </Link>
              <small className="text-gray-500">{post.date}</small>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
