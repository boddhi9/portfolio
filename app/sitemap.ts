export default async function sitemap() {
  const routes = ['', '/work'].map((route) => ({
    url: `https://krumgeorgiev.com${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes]
}
