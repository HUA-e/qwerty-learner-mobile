import { RadioGroup } from '@headlessui/react'
import { useCallback } from 'react'

type Props = {
  tagList: string[]
  currentTag: string
  onChangeCurrentTag: (tag: string) => void
}

export default function DictTagSwitcher({ tagList, currentTag, onChangeCurrentTag }: Props) {
  const onChangeTag = useCallback(
    (tag: string) => {
      onChangeCurrentTag(tag)
    },
    [onChangeCurrentTag],
  )

  return (
    <RadioGroup value={currentTag} onChange={onChangeTag}>
      <div className="flex flex-wrap items-center gap-2 space-x-0 sm:flex-nowrap sm:gap-0 sm:space-x-4">
        {tagList.map((option) => (
          <RadioGroup.Option
            key={option}
            value={option}
            className={({ checked }) =>
              `cursor-pointer whitespace-nowrap rounded-[3rem] px-4 py-2 ${
                checked ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 dark:bg-gray-800 dark:text-gray-200'
              } ${!checked && 'hover:bg-gray-100 dark:hover:bg-gray-600'}`
            }
          >
            <p className={`font-normal `}>{option}</p>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}
