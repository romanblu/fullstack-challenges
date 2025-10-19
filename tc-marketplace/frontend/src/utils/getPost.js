
export default async function getPost(slug) {
  const response = await fetch(`/content/blog/${slug}.md`);
  const text = await response.text();
  return { text };

}