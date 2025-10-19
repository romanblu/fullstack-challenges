import matter from 'gray-matter';

export default async function getPost(slug) {
  const response = await fetch(`/content/blog/${slug}.md`);
  const text = await response.text();
//   const { data, content } = matter(text);
  return { text };
return text
}