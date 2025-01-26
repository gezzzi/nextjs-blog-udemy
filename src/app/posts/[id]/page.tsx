import { getAllPosts, getPost } from '../../../../lib/post';
import { notFound } from 'next/navigation';
import { remark } from 'remark';
import html from 'remark-html';

// 動的なルートのパラメータを生成
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}

// マークダウンの内容を取得してHTMLに変換する関数
async function getPostData(id: string) {
  try {
    const post = getPost(id);
    
    if (!post) {
      return null;
    }

    // マークダウンをHTMLに変換
    const processedContent = await remark()
      .use(html)
      .process(post.content);
    const contentHtml = processedContent.toString();

    return {
      ...post,
      contentHtml,
    };
  } catch (error) {
    console.error('Error getting post:', error);
    return null;
  }
}

// 記事詳細ページのコンポーネント
export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const post = await getPostData(id);
    
    if (!post) {
      notFound();
    }

    return (
      <article className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-500 dark:text-gray-100 mb-8">{post.date}</div>
        <div 
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    );
  } catch (error) {
    console.error('Error rendering post:', error);
    notFound();
  }
} 