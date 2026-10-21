import Tooltip from '@/components/Tooltip'
import { currentChapterAtom, currentDictInfoAtom, isReviewModeAtom } from '@/store'
import range from '@/utils/range'
import { Listbox, Transition } from '@headlessui/react'
import { useAtom, useAtomValue } from 'jotai'
import { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import IconCheck from '~icons/tabler/check'

export const DictChapterButton = () => {
  const currentDictInfo = useAtomValue(currentDictInfoAtom)
  const [currentChapter, setCurrentChapter] = useAtom(currentChapterAtom)
  const chapterCount = currentDictInfo.chapterCount
  const isReviewMode = useAtomValue(isReviewModeAtom)

  const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (event) => {
    if (event.key === ' ') {
      event.preventDefault()
    }
  }
  return (
    <>
      <Tooltip content="词典切换">
        <NavLink
          className="block shrink-0 whitespace-nowrap rounded-xl px-3 py-1.5 text-base font-medium transition-colors duration-200 ease-in-out hover:bg-gray-100 focus:outline-none dark:text-gray-100 dark:hover:bg-gray-800 sm:text-lg"
          to="/gallery"
        >
          {currentDictInfo.name} {isReviewMode && '错题复习'}
        </NavLink>
      </Tooltip>
      {!isReviewMode && (
        <Tooltip content="章节切换">
          <Listbox value={currentChapter} onChange={setCurrentChapter}>
            <Listbox.Button
              onKeyDown={handleKeyDown}
              className="shrink-0 whitespace-nowrap rounded-xl px-3 py-1.5 text-base font-medium transition-colors duration-200 ease-in-out hover:bg-gray-100 focus:outline-none dark:text-gray-100 dark:hover:bg-gray-800 sm:text-lg"
            >
              第 {currentChapter + 1} 章
            </Listbox.Button>
            <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Listbox.Options className="listbox-options z-10 w-32">
                {range(0, chapterCount, 1).map((index) => (
                  <Listbox.Option key={index} value={index}>
                    {({ selected }) => (
                      <div className="group flex cursor-pointer items-center justify-between">
                        {selected ? (
                          <span className="listbox-options-icon">
                            <IconCheck className="focus:outline-none" />
                          </span>
                        ) : null}
                        <span>第 {index + 1} 章</span>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Listbox>
        </Tooltip>
      )}
    </>
  )
}
