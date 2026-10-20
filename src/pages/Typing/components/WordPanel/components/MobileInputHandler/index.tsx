import type { WordUpdateAction } from '../InputHandler'
import { TypingContext, TypingStateActionType } from '@/pages/Typing/store'
import type { FormEvent } from 'react'
import { useCallback, useContext, useEffect, useRef } from 'react'

export default function MobileInputHandler({ updateInput }: { updateInput: (updateObj: WordUpdateAction) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
  const { state, dispatch } = useContext(TypingContext)!

  useEffect(() => {
    if (state.isTyping && document.activeElement !== inputRef.current) {
      inputRef.current?.focus()
    }
  }, [state.isTyping])

  const commitInput = useCallback(
    (input: HTMLInputElement, event: WordUpdateAction['event']) => {
      const value = input.value
      if (!value) return

      for (const char of value) {
        updateInput({ type: 'add', value: char, event })
      }
      input.value = ''
    },
    [updateInput],
  )

  const onInput = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      const nativeEvent = e.nativeEvent as InputEvent
      if (nativeEvent.isComposing) return
      commitInput(e.currentTarget, e)
    },
    [commitInput],
  )

  return (
    <div className="z-30 mt-2 flex w-[90vw] max-w-sm items-center justify-center">
      <input
        ref={inputRef}
        type="text"
        inputMode="text"
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        enterKeyHint="done"
        spellCheck={false}
        aria-label="手机拼写输入框"
        data-mobile-typing-input="true"
        placeholder={state.isTyping ? '键盘已打开，直接拼写' : '点这里打开键盘'}
        className="h-12 w-full rounded-xl border-2 border-indigo-200 bg-white px-4 text-center font-mono text-base text-gray-700 shadow-sm outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500"
        onFocus={() => {
          if (!state.isTyping) dispatch({ type: TypingStateActionType.SET_IS_TYPING, payload: true })
        }}
        onInput={onInput}
        onCompositionEnd={(e) => commitInput(e.currentTarget, e.nativeEvent)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            e.stopPropagation()
          }
        }}
      />
    </div>
  )
}
