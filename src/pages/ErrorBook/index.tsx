import DropdownExport from './DropdownExport'
import ErrorRow from './ErrorRow'
import type { ISortType } from './HeadWrongNumber'
import HeadWrongNumber from './HeadWrongNumber'
import Pagination, { ITEM_PER_PAGE } from './Pagination'
import RowDetail from './RowDetail'
import { currentRowDetailAtom } from './store'
import type { groupedWordRecords } from './type'
import { db, useDeleteWordRecord } from '@/utils/db'
import type { WordRecord } from '@/utils/db/record'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useAtomValue } from 'jotai'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import IconX from '~icons/tabler/x'

export function ErrorBook() {
  const [groupedRecords, setGroupedRecords] = useState<groupedWordRecords[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = useMemo(() => Math.ceil(groupedRecords.length / ITEM_PER_PAGE), [groupedRecords.length])
  const [sortType, setSortType] = useState<ISortType>('asc')
  const navigate = useNavigate()
  const currentRowDetail = useAtomValue(currentRowDetailAtom)
  const { deleteWordRecord } = useDeleteWordRecord()
  const [reload, setReload] = useState(false)

  const onBack = useCallback(() => {
    navigate('/')
  }, [navigate])

  const setPage = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) return
      setCurrentPage(page)
    },
    [totalPages],
  )

  const setSort = useCallback(
    (sortType: ISortType) => {
      setSortType(sortType)
      setPage(1)
    },
    [setPage],
  )

  const sortedRecords = useMemo(() => {
    if (sortType === 'none') return groupedRecords
    return [...groupedRecords].sort((a, b) => {
      if (sortType === 'asc') {
        return a.wrongCount - b.wrongCount
      } else {
        return b.wrongCount - a.wrongCount
      }
    })
  }, [groupedRecords, sortType])

  const renderRecords = useMemo(() => {
    const start = (currentPage - 1) * ITEM_PER_PAGE
    const end = start + ITEM_PER_PAGE
    return sortedRecords.slice(start, end)
  }, [currentPage, sortedRecords])

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, Math.max(totalPages, 1)))
  }, [totalPages])

  useEffect(() => {
    db.wordRecords
      .where('wrongCount')
      .above(0)
      .toArray()
      .then((records) => {
        const groups: groupedWordRecords[] = []

        records.forEach((record) => {
          let group = groups.find((g) => g.word === record.word && g.dict === record.dict)
          if (!group) {
            group = { word: record.word, dict: record.dict, records: [], wrongCount: 0 }
            groups.push(group)
          }
          group.records.push(record as WordRecord)
        })

        groups.forEach((group) => {
          group.wrongCount = group.records.reduce((acc, cur) => {
            acc += cur.wrongCount
            return acc
          }, 0)
        })

        setGroupedRecords(groups)
      })
  }, [reload])

  const handleDelete = async (word: string, dict: string) => {
    await deleteWordRecord(word, dict)
    setReload((prev) => !prev)
  }

  return (
    <>
      <div className={`relative flex h-[100dvh] w-full flex-col items-center pb-4 ease-in ${currentRowDetail && 'blur-sm'}`}>
        <div className="flex w-full items-start justify-between gap-3 px-4 pb-4 pt-4 sm:justify-end sm:px-8">
          <h1 className="max-w-[16rem] text-sm leading-6 text-gray-500 opacity-70 sm:max-w-none sm:text-base">
            Tip: 点击错误单词查看详细信息
          </h1>
          <button
            type="button"
            aria-label="关闭错题本"
            onClick={onBack}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          >
            <IconX className="h-6 w-6" />
          </button>
        </div>

        <div className="flex w-full flex-1 select-text items-start justify-center overflow-hidden px-3 sm:px-0">
          <div className="flex h-full min-h-0 w-full flex-col sm:w-5/6 sm:pt-10">
            <div className="mb-3 flex items-center justify-between gap-3 px-1 sm:hidden">
              <span className="text-sm text-gray-500 dark:text-gray-400">共 {groupedRecords.length} 个错词</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSort(sortType === 'asc' ? 'desc' : sortType === 'desc' ? 'none' : 'asc')}
                  className="rounded-lg border border-gray-200 bg-white/70 px-2.5 py-1.5 text-xs text-gray-600 dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-300"
                >
                  错误次数{sortType === 'asc' ? ' ↑' : sortType === 'desc' ? ' ↓' : ''}
                </button>
                <DropdownExport renderRecords={sortedRecords} />
              </div>
            </div>
            <div className="hidden w-full justify-between rounded-lg bg-white px-6 py-5 text-lg text-black shadow-lg dark:bg-gray-800 dark:text-white sm:flex">
              <span className="basis-2/12">单词</span>
              <span className="basis-6/12">释义</span>
              <HeadWrongNumber className="basis-1/12" sortType={sortType} setSortType={setSort} />
              <span className="basis-1/12">词典</span>
              <DropdownExport renderRecords={sortedRecords} />
            </div>
            <ScrollArea.Root className="min-h-0 flex-1 overflow-y-auto pt-3 sm:pt-5">
              <ScrollArea.Viewport className="h-full">
                <div className="flex flex-col gap-3">
                  {groupedRecords.length === 0 ? (
                    <div className="mx-auto flex max-w-sm flex-col items-center rounded-2xl border border-white/80 bg-white/65 px-6 py-10 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
                      <p className="text-base font-medium text-gray-800 dark:text-gray-200">还没有错题</p>
                      <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                        练习时拼错的单词会自动收录，之后可以在这里集中复习。
                      </p>
                    </div>
                  ) : (
                    renderRecords.map((record) => (
                      <ErrorRow
                        key={`${record.dict}-${record.word}`}
                        record={record}
                        onDelete={() => handleDelete(record.word, record.dict)}
                      />
                    ))
                  )}
                </div>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar className="flex touch-none select-none bg-transparent" orientation="vertical"></ScrollArea.Scrollbar>
            </ScrollArea.Root>
          </div>
        </div>
        {totalPages > 1 && <Pagination className="pt-3" page={currentPage} setPage={setPage} totalPages={totalPages} />}
      </div>
      {currentRowDetail && <RowDetail currentRowDetail={currentRowDetail} allRecords={sortedRecords} />}
    </>
  )
}
