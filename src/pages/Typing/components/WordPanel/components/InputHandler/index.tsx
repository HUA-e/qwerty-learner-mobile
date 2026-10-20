import KeyEventHandler from '../KeyEventHandler'
import MobileInputHandler from '../MobileInputHandler'
import TextAreaHandler from '../TextAreaHandler'
import { currentDictInfoAtom } from '@/store'
import { IsDesktop } from '@/utils'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'

export default function InputHandler({ updateInput }: { updateInput: (updateObj: WordUpdateAction) => void }) {
  const dictInfo = useAtomValue(currentDictInfoAtom)

  const handler = useMemo(() => {
    if (!IsDesktop()) {
      return <MobileInputHandler updateInput={updateInput} />
    }

    switch (dictInfo.language) {
      case 'en':
        return <KeyEventHandler updateInput={updateInput} />
      case 'de':
        return <KeyEventHandler updateInput={updateInput} />
      case 'romaji':
        return <KeyEventHandler updateInput={updateInput} />
      case 'code':
        return <TextAreaHandler updateInput={updateInput} />
      default:
        return <TextAreaHandler updateInput={updateInput} />
    }
  }, [dictInfo.language, updateInput])

  return <>{handler}</>
}
export type WordUpdateAction = WordAddAction | WordDeleteAction | WordCompositionAction

export type WordInputEvent = {
  preventDefault: () => void
}

export type WordAddAction = {
  type: 'add'
  value: string
  event: WordInputEvent
}

export type WordDeleteAction = {
  type: 'delete'
  length: number
}

// composition api is not ready yet
export type WordCompositionAction = {
  type: 'composition'
  value: string
}
