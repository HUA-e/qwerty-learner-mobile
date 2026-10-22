import { LoadingWordUI } from './LoadingWordUI'
import useGetWord from './hooks/useGetWord'
import { currentRowDetailAtom } from './store'
import type { groupedWordRecords } from './type'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { idDictionaryMap } from '@/resources/dictionary'
import { recordErrorBookAction } from '@/utils'
import { useSetAtom } from 'jotai'
import type { FC } from 'react'
import { useCallback } from 'react'
import DeleteIcon from '~icons/weui/delete-filled'

type IErrorRowProps = {
  record: groupedWordRecords
  onDelete: () => void
}

const ErrorRow: FC<IErrorRowProps> = ({ record, onDelete }) => {
  const setCurrentRowDetail = useSetAtom(currentRowDetailAtom)
  const dictInfo = idDictionaryMap[record.dict]
  const { word, isLoading, hasError } = useGetWord(record.word, dictInfo)

  const onClick = useCallback(() => {
    setCurrentRowDetail(record)
    recordErrorBookAction('detail')
  }, [record, setCurrentRowDetail])

  return (
    <li
      className="w-full list-none cursor-pointer rounded-xl bg-white px-4 py-3 text-black shadow-md dark:bg-gray-800 dark:text-white sm:rounded-lg sm:px-6 sm:py-3"
      onClick={onClick}
    >
      <div className="hidden w-full items-center justify-between sm:flex">
        <span className="basis-2/12 break-normal">{record.word}</span>
        <span className="basis-6/12 break-normal">
          {word ? word.trans.join('；') : <LoadingWordUI isLoading={isLoading} hasError={hasError} />}
        </span>
        <span className="basis-1/12 break-normal pl-8">{record.wrongCount}</span>
        <span className="basis-1/12 break-normal">{dictInfo?.name}</span>
        <span
          className="basis-1/12 break-normal"
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DeleteIcon />
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete Records</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </span>
      </div>

      <div className="sm:hidden">
        <div className="flex items-start justify-between gap-3">
          <span className="min-w-0 break-all font-mono text-lg font-medium">{record.word}</span>
          <span className="shrink-0 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-800 dark:bg-teal-950/60 dark:text-teal-200">
            错 {record.wrongCount} 次
          </span>
        </div>
        <div className="mt-1.5 break-words text-sm leading-6 text-gray-500 dark:text-gray-400">
          {word ? word.trans.join('；') : <LoadingWordUI isLoading={isLoading} hasError={hasError} />}
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400">
          <span className="min-w-0 truncate">{dictInfo?.name || record.dict}</span>
          <button
            type="button"
            aria-label={`删除错题 ${record.word}`}
            className="shrink-0 rounded-lg px-2 py-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
          >
            删除
          </button>
        </div>
      </div>
    </li>
  )
}

export default ErrorRow
