import type { DictionaryResource } from '@/typings/index'

export const PERSONAL_WORDBOOK_ENABLED = import.meta.env.VITE_PERSONAL_WORDBOOK === 'true'
export const PERSONAL_WORDBOOK_ID = 'kaoyan-redbook-2027'

export const personalWordbooks: DictionaryResource[] = PERSONAL_WORDBOOK_ENABLED
  ? [
      {
        id: PERSONAL_WORDBOOK_ID,
        name: '2027 红宝书',
        description: '考研英语红宝书（必考 + 基础） · 5675 词',
        category: '我的词书',
        tags: ['考研'],
        url: '/dicts/2027KaoYanHongBaoShu.json',
        length: 5675,
        language: 'en',
        languageCategory: 'en',
      },
    ]
  : []
