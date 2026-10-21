import { TypingContext, TypingStateActionType } from '../../store'
import Tooltip from '@/components/Tooltip'
import { useCallback, useContext } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

export default function StartButton({ isLoading }: { isLoading: boolean }) {
  // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
  const { state, dispatch } = useContext(TypingContext)!

  const onToggleIsTyping = useCallback(() => {
    !isLoading && dispatch({ type: TypingStateActionType.TOGGLE_IS_TYPING })
  }, [isLoading, dispatch])

  const onEnter = useCallback(
    (event: KeyboardEvent) => {
      const target = event.target
      if (target instanceof HTMLElement && target.closest('[data-mobile-typing-input="true"]')) {
        return
      }
      onToggleIsTyping()
    },
    [onToggleIsTyping],
  )

  useHotkeys('enter', onEnter, { enableOnFormTags: true, preventDefault: true }, [onEnter])

  return (
    <Tooltip content={`${state.isTyping ? '暂停' : '开始'} （Enter）`} className="shrink-0">
      <button
        className={`ml-auto sm:ml-0 ${
          state.isTyping ? 'bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600' : 'bg-gray-900 dark:bg-gray-100'
        } my-btn-primary h-10 w-20 shrink-0 px-0 text-sm shadow sm:h-11 sm:w-24 sm:text-base`}
        type="button"
        onClick={onToggleIsTyping}
        aria-label={state.isTyping ? '暂停' : '开始'}
      >
        <span className="font-medium">{state.isTyping ? '暂停' : '开始'}</span>
      </button>
    </Tooltip>
  )
}
