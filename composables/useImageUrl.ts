export function useImageUrl(url: string): string {
  try {
    const parsed = new URL(url)
    return parsed.pathname
  } catch {
    const match = url.match(/\/[^\/]+\.[a-zA-Z0-9]+$/)
    return match ? match[0] : ''
  }
}
