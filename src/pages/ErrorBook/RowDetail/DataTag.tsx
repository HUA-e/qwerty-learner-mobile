import type React from 'react'

interface DataTagProps {
  icon: React.ElementType
  name: string
  data: number | string
}

const DataTag: React.FC<DataTagProps> = ({ icon, name, data }) => {
  const IconComponent = icon

  return (
    <div className="flex h-12 w-full min-w-0 select-none items-center justify-between rounded-md border-gray-400 bg-gray-100 px-3 py-3 shadow dark:border-gray-600 dark:bg-gray-800">
      <div className="flex min-w-0 items-center space-x-1">
        <IconComponent className="h-4 w-4 text-gray-700 dark:text-gray-300" />
        <span className="whitespace-nowrap text-sm font-normal text-gray-500 dark:text-gray-300 sm:text-base">{name}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-normal text-gray-800 dark:text-gray-200 sm:text-base">{data}</span>
      </div>
    </div>
  )
}

export default DataTag
