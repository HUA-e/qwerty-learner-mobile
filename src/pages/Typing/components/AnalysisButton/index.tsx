import { recordAnalysisAction } from '@/utils'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import ChartPie from '~icons/heroicons/chart-pie-solid'

const AnalysisButton = () => {
  const navigate = useNavigate()

  const toAnalysis = useCallback(() => {
    navigate('/analysis')
    recordAnalysisAction('open')
  }, [navigate])

  return (
    <button
      type="button"
      onClick={toAnalysis}
      className={`flex items-center justify-center rounded p-[2px] text-lg text-gray-800 dark:text-gray-200 outline-none transition-colors duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800`}
      title="查看数据统计"
    >
      <ChartPie className="icon" />
    </button>
  )
}

export default AnalysisButton
