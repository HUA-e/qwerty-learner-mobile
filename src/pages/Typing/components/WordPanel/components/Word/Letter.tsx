import { EXPLICIT_SPACE } from '@/constants'
import { fontSizeConfigAtom } from '@/store'
import { useAtomValue } from 'jotai'
import React from 'react'

export type LetterState = 'normal' | 'correct' | 'wrong'

const stateClassNameMap: Record<string, Record<LetterState, string>> = {
  true: {
    normal: 'text-gray-300 dark:text-gray-600',
    correct: 'text-teal-700 dark:text-teal-400',
    wrong: 'text-red-700 dark:text-red-400',
  },
  false: {
    normal: 'text-gray-800 dark:text-gray-100',
    correct: 'text-teal-700 dark:text-teal-400',
    wrong: 'text-red-700 dark:text-red-400',
  },
}

export type LetterProps = {
  letter: string
  state?: LetterState
  visible?: boolean
  fontSize?: number
}

const Letter: React.FC<LetterProps> = ({ letter, state = 'normal', visible = true, fontSize }) => {
  const fontSizeConfig = useAtomValue(fontSizeConfigAtom)
  return (
    <span
      className={`m-0 p-0 font-serif font-normal tracking-[-0.02em] ${
        stateClassNameMap[(letter === EXPLICIT_SPACE) as unknown as string][state]
      } pr-0.8 duration-0 dark:text-opacity-80`}
      style={{ fontSize: `${fontSize ?? fontSizeConfig.foreignFont}px` }}
    >
      {visible ? letter : '_'}
    </span>
  )
}

export default React.memo(Letter)
