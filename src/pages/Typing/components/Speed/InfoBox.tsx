import React from 'react'

const InfoBox: React.FC<InfoBoxProps> = ({ info, description }) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <span className="w-4/5 border-b border-gray-300/80 pb-1 text-center text-base font-semibold tabular-nums text-gray-900 transition-colors duration-300 dark:border-gray-700 dark:text-gray-100 sm:pb-2 sm:text-xl">
        {info}
      </span>
      <span className="pt-1 text-[10px] font-medium text-gray-500 transition-colors duration-300 dark:text-gray-400 sm:pt-2 sm:text-xs">{description}</span>
    </div>
  )
}

export default React.memo(InfoBox)

export type InfoBoxProps = {
  info: string
  description: string
}
