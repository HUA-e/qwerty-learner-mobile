import HeatmapCharts from './components/HeatmapCharts'
import KeyboardWithBarCharts from './components/KeyboardWithBarCharts'
import LineCharts from './components/LineCharts'
import { useWordStats } from './hooks/useWordStats'
import Layout from '@/components/Layout'
import { isOpenDarkModeAtom } from '@/store'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import dayjs from 'dayjs'
import { useAtom } from 'jotai'
import { useCallback } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useNavigate } from 'react-router-dom'
import IconX from '~icons/tabler/x'

const Analysis = () => {
  const navigate = useNavigate()
  const [, setIsOpenDarkMode] = useAtom(isOpenDarkModeAtom)

  const onBack = useCallback(() => {
    navigate('/')
  }, [navigate])

  const changeDarkModeState = () => {
    setIsOpenDarkMode((old) => !old)
  }

  useHotkeys(
    'ctrl+d',
    () => {
      changeDarkModeState()
    },
    { enableOnFormTags: true, preventDefault: true },
    [],
  )

  useHotkeys('enter,esc', onBack, { preventDefault: true })

  const { isEmpty, exerciseRecord, wordRecord, wpmRecord, accuracyRecord, wrongTimeRecord } = useWordStats(
    dayjs().subtract(1, 'year').unix(),
    dayjs().unix(),
  )

  return (
    <Layout>
      <div className="flex w-full flex-1 flex-col overflow-y-auto px-2 pb-6 pt-16 sm:pl-20 sm:pr-20 sm:pt-20">
        <button
          type="button"
          aria-label="关闭统计"
          onClick={onBack}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200 sm:right-20 sm:top-10"
        >
          <IconX className="h-6 w-6" />
        </button>
        <ScrollArea.Root className="w-full min-w-0 flex-1 overflow-y-auto">
          <ScrollArea.Viewport className="h-full w-auto pb-[20rem] [&>div]:!block">
            {isEmpty ? (
              <div className="align-items-center my-4 grid h-72 w-full place-content-center overflow-hidden rounded-lg shadow-lg dark:bg-gray-600 sm:h-80">
                <div className="text-2xl text-gray-400">暂无练习数据</div>
              </div>
            ) : (
              <>
                <div className="my-4 w-full overflow-hidden rounded-lg p-3 shadow-lg dark:bg-gray-700 dark:bg-opacity-50 sm:mx-4 sm:my-8 sm:w-auto sm:p-8">
                  <HeatmapCharts title="过去一年练习次数热力图" data={exerciseRecord} />
                </div>
                <div className="my-4 w-full overflow-hidden rounded-lg p-3 shadow-lg dark:bg-gray-700 dark:bg-opacity-50 sm:mx-4 sm:my-8 sm:w-auto sm:p-8">
                  <HeatmapCharts title="过去一年练习词数热力图" data={wordRecord} />
                </div>
                <div className="my-4 h-64 w-full overflow-hidden rounded-lg p-3 shadow-lg dark:bg-gray-700 dark:bg-opacity-50 sm:mx-4 sm:my-8 sm:h-80 sm:w-auto sm:p-8">
                  <LineCharts title="过去一年WPM趋势图" name="WPM" data={wpmRecord} />
                </div>
                <div className="my-4 h-64 w-full overflow-hidden rounded-lg p-3 shadow-lg dark:bg-gray-700 dark:bg-opacity-50 sm:mx-4 sm:my-8 sm:h-80 sm:w-auto sm:p-8">
                  <LineCharts title="过去一年正确率趋势图" name="正确率(%)" data={accuracyRecord} suffix="%" />
                </div>
                <div className="my-4 h-64 w-full overflow-hidden rounded-lg p-3 shadow-lg dark:bg-gray-700 dark:bg-opacity-50 sm:mx-4 sm:my-8 sm:h-80 sm:w-auto sm:p-8">
                  <KeyboardWithBarCharts title="按键错误次数排行" name="错误次数" data={wrongTimeRecord} />
                </div>
              </>
            )}
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar className="flex touch-none select-none bg-transparent " orientation="vertical"></ScrollArea.Scrollbar>
        </ScrollArea.Root>
        <div className="overflow-y-auto"></div>
      </div>
    </Layout>
  )
}

export default Analysis
