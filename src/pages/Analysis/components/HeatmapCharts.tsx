import { isOpenDarkModeAtom } from '@/store'
import useWindowSize from '@/hooks/useWindowSize'
import { useAtom } from 'jotai'
import type { FC } from 'react'
import React from 'react'
import type { Activity } from 'react-activity-calendar'
import ActivityCalendar from 'react-activity-calendar'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

interface HeatmapChartsProps {
  title: string
  data: Activity[]
}

const HeatmapCharts: FC<HeatmapChartsProps> = ({ data, title }) => {
  const [isOpenDarkMode] = useAtom(isOpenDarkModeAtom)
  const { width } = useWindowSize()
  const isMobile = width < 640
  const displayData = isMobile ? data.slice(-120) : data

  return (
    <div className="flex w-full min-w-0 flex-col items-center justify-center">
      <div className="text-center text-base font-bold text-gray-600 dark:text-white sm:text-xl">{title}</div>
      {isMobile && <p className="mt-1 text-xs text-gray-400">手机上显示最近约四个月</p>}
      <div className="mt-2 flex w-full min-w-0 justify-center overflow-hidden">
        <ActivityCalendar
          fontSize={isMobile ? 10 : 20}
          blockSize={isMobile ? 10 : 22}
          blockRadius={isMobile ? 3 : 7}
          style={{
            padding: isMobile ? '8px 0 4px' : '40px 60px 20px 100px',
            color: isOpenDarkMode ? '#fff' : '#000',
            maxWidth: '100%',
          }}
          colorScheme={isOpenDarkMode ? 'dark' : 'light'}
          data={displayData}
          theme={{
            light: ['#f0f0f0', '#6366f1'],
            dark: ['hsl(0, 0%, 22%)', '#818cf8'],
          }}
          renderBlock={(block, activity) =>
            React.cloneElement(block, {
              'data-tooltip-id': 'react-tooltip',
              'data-tooltip-html': `${activity.date} 练习 ${activity.count} 次`,
            })
          }
          showWeekdayLabels={!isMobile}
          labels={{
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            weekdays: ['日', '一', '二', '三', '四', '五', '六'],
            totalCount: `${isMobile ? '最近' : '过去一年'}总计 {{count}} 次`,
            legend: {
              less: '少',
              more: '多',
            },
          }}
        />
      </div>
      <ReactTooltip id="react-tooltip" />
    </div>
  )
}

export default HeatmapCharts
