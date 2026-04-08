async function getBlog(slug: string) {
  const res = await fetch(`https://yourdomain.com/api/blogs/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) return null;
  return res.json();
}