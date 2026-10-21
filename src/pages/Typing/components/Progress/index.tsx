import { TypingContext } from '../../store'
import { useContext, useEffect, useState } from 'react'

export default function Progress({ className }: { className?: string }) {
  // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
  const { state } = useContext(TypingContext)!
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0)

  const colorSwitcher: { [key: number]: string } = {
    0: 'bg-gray-400 dark:bg-gray-500',
    1: 'bg-gray-600 dark:bg-gray-300',
    2: 'bg-teal-700 dark:bg-teal-400',
  }

  useEffect(() => {
    const newProgress = Math.floor((state.chapterData.index / state.chapterData.words.length) * 100)
    setProgress(newProgress)
    const colorPhase = Math.floor(newProgress / 33.4)
    setPhase(colorPhase)
  }, [state.chapterData.index, state.chapterData.words.length])

  return (
    <div className={`relative w-1/4 pt-1 ${className}`}>
      <div className="mb-4 flex h-1.5 overflow-hidden rounded-full bg-gray-200/90 text-xs transition-all duration-300 dark:bg-gray-800">
        <div
          style={{ width: `${progress}%` }}
          className={`flex flex-col justify-center whitespace-nowrap rounded-full text-center text-white shadow-none transition-all duration-300 ${
            colorSwitcher[phase] ?? 'bg-gray-400 dark:bg-gray-500'
          }`}
        ></div>
      </div>
    </div>
  )
}
