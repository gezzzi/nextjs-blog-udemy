import { getAllPosts } from '../../lib/post';

export default async function sitemap() {
  const baseUrl = 'https://www.techstepsite.com';
  const posts = getAllPosts();

  // ブログ記事のURLを生成
  const postsUrls = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.id}`,
    lastModified: new Date(post.date),
  }));

  // 固定ページのURL
  const routes = [''].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...routes, ...postsUrls];
} 