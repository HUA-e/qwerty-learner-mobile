import type { Word } from '@/typings'

export async function wordListFetcher(url: string): Promise<Word[]> {
  const baseUrl = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '')
  const response = await fetch(baseUrl + url)
  if (!response.ok) {
    throw new Error(`词书加载失败（${response.status}）`)
  }
  const contentType = response.headers.get('content-type') || ''
  if (!contentType.includes('json')) {
    throw new Error('词书文件格式错误')
  }
  const words: Word[] = await response.json()
  if (!Array.isArray(words) || words.length === 0) {
    throw new Error('词书没有有效单词')
  }
  return words
}
