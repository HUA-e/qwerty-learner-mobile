import SharePicDialog from './SharePicDialog'
import { recordShareAction } from '@/utils'
import { useCallback, useMemo, useState } from 'react'
import IconShare2 from '~icons/tabler/share-2'

export default function ShareButton() {
  const [isShowSharePanel, setIsShowSharePanel] = useState(false)

  const randomChoose = useMemo(
    () => ({
      picRandom: Math.random(),
      promoteRandom: Math.random(),
    }),
    [],
  )

  const onClickShare = useCallback(() => {
    recordShareAction('open')
    setIsShowSharePanel(true)
  }, [])

  return (
    <>
      {isShowSharePanel && <SharePicDialog showState={isShowSharePanel} setShowState={setIsShowSharePanel} randomChoose={randomChoose} />}

      <button
        type="button"
        aria-label="分享成绩"
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-xl text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100"
        onClick={onClickShare}
        title="分享你的成绩给朋友"
      >
        <IconShare2 />
      </button>
    </>
  )
}
