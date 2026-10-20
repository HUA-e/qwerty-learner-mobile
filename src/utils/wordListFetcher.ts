import type { Word } from '@/typings'

export async function wordListFetcher(url: string): Promise<Word[]> {
  const baseUrl = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '')
  const response = await fetch(baseUrl + url)
  const words: Word[] = await response.json()
  return words
}
