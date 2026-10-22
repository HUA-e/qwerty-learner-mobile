import { TypingContext, TypingStateActionType } from '../../store'
import HandPositionIllustration from '../HandPositionIllustration'
import { LANG_PRON_MAP } from '@/resources/soundResource'
import {
  currentDictInfoAtom,
  hintSoundsConfigAtom,
  isOpenDarkModeAtom,
  isShowPrevAndNextWordAtom,
  keySoundsConfigAtom,
  loopWordConfigAtom,
  phoneticConfigAtom,
  pronunciationConfigAtom,
  randomConfigAtom,
  wordDictationConfigAtom,
} from '@/store'
import type { LoopWordTimesOption, PronunciationType, WordDictationType } from '@/typings'
import { PRONUNCIATION_PHONETIC_MAP } from '@/typings'
import { recordAnalysisAction, recordErrorBookAction } from '@/utils'
import { Dialog, Switch, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { useAtom, useAtomValue } from 'jotai'
import { Fragment, useCallback, useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import IconAdjustmentsHorizontal from '~icons/tabler/adjustments-horizontal'
import IconBook from '~icons/bxs/book'
import IconChartPie from '~icons/heroicons/chart-pie-solid'
import IconX from '~icons/tabler/x'

const loopOptions: LoopWordTimesOption[] = [1, 3, 5, 8, Number.MAX_SAFE_INTEGER]
const dictationOptions: { name: string; type: WordDictationType }[] = [
  { name: '全部隐藏', type: 'hideAll' },
  { name: '隐藏元音', type: 'hideVowel' },
  { name: '隐藏辅音', type: 'hideConsonant' },
  { name: '随机隐藏', type: 'randomHide' },
]

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string
  description?: string
  checked: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{title}</p>
        {description && <p className="mt-0.5 text-xs leading-5 text-gray-500 dark:text-gray-400">{description}</p>}
      </div>
      <Switch checked={checked} onChange={onChange} className="switch-root shrink-0" aria-label={title}>
        <span aria-hidden="true" className="switch-thumb" />
      </Switch>
    </div>
  )
}

function OptionButton({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={classNames(
        'min-h-10 flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition-colors',
        active
          ? 'border-gray-900 bg-gray-900 text-white dark:border-gray-100 dark:bg-gray-100 dark:text-gray-950'
          : 'border-gray-200 bg-white/70 text-gray-700 hover:bg-white dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-300',
      )}
    >
      {children}
    </button>
  )
}

export default function MobileTools() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const { state, dispatch } = useContext(TypingContext)!
  const currentDictInfo = useAtomValue(currentDictInfoAtom)
  const [pronunciationConfig, setPronunciationConfig] = useAtom(pronunciationConfigAtom)
  const [phoneticConfig, setPhoneticConfig] = useAtom(phoneticConfigAtom)
  const [keySoundsConfig, setKeySoundsConfig] = useAtom(keySoundsConfigAtom)
  const [hintSoundsConfig, setHintSoundsConfig] = useAtom(hintSoundsConfigAtom)
  const [wordDictationConfig, setWordDictationConfig] = useAtom(wordDictationConfigAtom)
  const [loopWordConfig, setLoopWordConfig] = useAtom(loopWordConfigAtom)
  const [randomConfig, setRandomConfig] = useAtom(randomConfigAtom)
  const [isShowPrevAndNextWord, setIsShowPrevAndNextWord] = useAtom(isShowPrevAndNextWordAtom)
  const [isOpenDarkMode, setIsOpenDarkMode] = useAtom(isOpenDarkModeAtom)

  const pronunciationList = useMemo(() => LANG_PRON_MAP[currentDictInfo.language].pronunciation, [currentDictInfo.language])

  const changePronunciationType = useCallback(
    (value: PronunciationType) => {
      const item = pronunciationList.find((option) => option.pron === value)
      if (!item) return

      setPronunciationConfig((old) => ({ ...old, type: item.pron, name: item.name }))
      const phoneticType = PRONUNCIATION_PHONETIC_MAP[item.pron]
      if (phoneticType) {
        setPhoneticConfig((old) => ({ ...old, type: phoneticType }))
      }
    },
    [pronunciationList, setPhoneticConfig, setPronunciationConfig],
  )

  const openRoute = useCallback(
    (path: '/error-book' | '/analysis') => {
      if (path === '/error-book') {
        recordErrorBookAction('open')
      } else {
        recordAnalysisAction('open')
      }
      setIsOpen(false)
      navigate(path)
    },
    [navigate],
  )

  const openTools = useCallback(() => {
    setIsOpen(true)
    dispatch({ type: TypingStateActionType.SET_IS_TYPING, payload: false })
  }, [dispatch])

  return (
    <>
      <button
        type="button"
        onClick={openTools}
        aria-label="打开学习工具"
        className="flex h-10 shrink-0 items-center gap-1 rounded-xl px-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 dark:text-gray-200 dark:hover:bg-gray-800"
      >
        <IconAdjustmentsHorizontal className="h-5 w-5" />
        <span>工具</span>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 sm:hidden" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px]" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-end justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-250"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
            >
              <Dialog.Panel className="flex max-h-[88dvh] w-full flex-col overflow-hidden rounded-t-3xl border border-white/80 bg-[#F3F5F6] shadow-2xl dark:border-gray-800 dark:bg-[#17181B]">
                <div className="flex shrink-0 items-center justify-between border-b border-gray-200/80 bg-white/65 px-5 pb-3 pt-4 dark:border-gray-800 dark:bg-gray-900/70">
                  <div>
                    <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-gray-100">学习工具</Dialog.Title>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">发音、默写、循环和显示方式都在这里</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="关闭学习工具"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                  >
                    <IconX className="h-5 w-5" />
                  </button>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-8 pt-4">
                  <section className="rounded-2xl border border-white/80 bg-white/65 px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
                    <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">发音与声音</h3>
                    {pronunciationList.length > 1 && (
                      <div className="mb-3 flex gap-2" role="group" aria-label="发音口音">
                        {pronunciationList.map((item) => (
                          <OptionButton
                            key={item.pron}
                            active={pronunciationConfig.type === item.pron}
                            onClick={() => changePronunciationType(item.pron)}
                          >
                            {item.name}
                          </OptionButton>
                        ))}
                      </div>
                    )}
                    <ToggleRow
                      title="单词发音"
                      description="进入新单词时自动播放"
                      checked={pronunciationConfig.isOpen}
                      onChange={(checked) => setPronunciationConfig((old) => ({ ...old, isOpen: checked }))}
                    />
                    <ToggleRow
                      title="显示音标"
                      checked={phoneticConfig.isOpen}
                      onChange={(checked) => setPhoneticConfig((old) => ({ ...old, isOpen: checked }))}
                    />
                    <ToggleRow
                      title="循环发音"
                      checked={pronunciationConfig.isLoop}
                      onChange={(checked) => setPronunciationConfig((old) => ({ ...old, isLoop: checked }))}
                    />
                    <ToggleRow
                      title="按键音"
                      checked={keySoundsConfig.isOpen}
                      onChange={(checked) => setKeySoundsConfig((old) => ({ ...old, isOpen: checked }))}
                    />
                    <ToggleRow
                      title="答题反馈音"
                      checked={hintSoundsConfig.isOpen}
                      onChange={(checked) => setHintSoundsConfig((old) => ({ ...old, isOpen: checked }))}
                    />
                  </section>

                  <section className="mt-3 rounded-2xl border border-white/80 bg-white/65 px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
                    <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">练习方式</h3>
                    <ToggleRow
                      title="释义常显"
                      description="关闭后可通过点击或悬停查看"
                      checked={state.isTransVisible}
                      onChange={() => dispatch({ type: TypingStateActionType.TOGGLE_TRANS_VISIBLE })}
                    />
                    <ToggleRow
                      title="默写模式"
                      checked={wordDictationConfig.isOpen}
                      onChange={(checked) =>
                        setWordDictationConfig((old) => ({ ...old, isOpen: checked, openBy: checked ? 'user' : old.openBy }))
                      }
                    />
                    {wordDictationConfig.isOpen && (
                      <div className="mb-3 grid grid-cols-2 gap-2" role="group" aria-label="默写隐藏方式">
                        {dictationOptions.map((option) => (
                          <OptionButton
                            key={option.type}
                            active={wordDictationConfig.type === option.type}
                            onClick={() => setWordDictationConfig((old) => ({ ...old, type: option.type }))}
                          >
                            {option.name}
                          </OptionButton>
                        ))}
                      </div>
                    )}
                    <div className="py-2.5">
                      <p className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">每个单词循环次数</p>
                      <div className="flex gap-2" role="group" aria-label="每个单词循环次数">
                        {loopOptions.map((value) => (
                          <OptionButton
                            key={value}
                            active={loopWordConfig.times === value}
                            onClick={() => setLoopWordConfig({ times: value })}
                          >
                            {value === Number.MAX_SAFE_INTEGER ? '无限' : value}
                          </OptionButton>
                        ))}
                      </div>
                    </div>
                    <ToggleRow
                      title="章节乱序"
                      description="下一章节开始生效"
                      checked={randomConfig.isOpen}
                      onChange={(checked) => setRandomConfig((old) => ({ ...old, isOpen: checked }))}
                    />
                    <ToggleRow
                      title="显示上一词 / 下一词"
                      checked={isShowPrevAndNextWord}
                      onChange={setIsShowPrevAndNextWord}
                    />
                  </section>

                  <section className="mt-3 rounded-2xl border border-white/80 bg-white/65 px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
                    <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-gray-100">显示与辅助</h3>
                    <ToggleRow
                      title="深色模式"
                      checked={isOpenDarkMode}
                      onChange={setIsOpenDarkMode}
                    />
                    <HandPositionIllustration showLabel />
                    <button
                      type="button"
                      onClick={() => openRoute('/error-book')}
                      className="flex w-full items-center gap-3 rounded-xl px-1 py-3 text-left text-sm font-medium text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                    >
                      <IconBook className="h-5 w-5 text-gray-500" />
                      错题本
                    </button>
                    <button
                      type="button"
                      onClick={() => openRoute('/analysis')}
                      className="flex w-full items-center gap-3 rounded-xl px-1 py-3 text-left text-sm font-medium text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                    >
                      <IconChartPie className="h-5 w-5 text-gray-500" />
                      数据统计
                    </button>
                  </section>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
