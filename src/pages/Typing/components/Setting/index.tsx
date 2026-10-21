import { TypingContext, TypingStateActionType } from '../../store'
import AdvancedSetting from './AdvancedSetting'
import DataSetting from './DataSetting'
import SoundSetting from './SoundSetting'
import ViewSetting from '@/pages/Typing/components/Setting/ViewSetting'
import { Dialog, Tab, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { Fragment, useContext, useState } from 'react'
import IconCog6Tooth from '~icons/heroicons/cog-6-tooth-solid'
import IconEye from '~icons/heroicons/eye-solid'
import IconAdjustmentsHorizontal from '~icons/tabler/adjustments-horizontal'
import IconDatabaseCog from '~icons/tabler/database-cog'
import IconEar from '~icons/tabler/ear'
import IconX from '~icons/tabler/x'

export default function Setting() {
  const [isOpen, setIsOpen] = useState(false)
  const { dispatch } = useContext(TypingContext) ?? {}

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
    if (dispatch) {
      dispatch({ type: TypingStateActionType.SET_IS_TYPING, payload: false })
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={`flex items-center justify-center rounded p-[2px] text-lg text-gray-800 outline-none dark:text-gray-200 transition-colors duration-300 ease-in-out hover:bg-teal-600 hover:text-white  ${
          isOpen && 'bg-gray-900 text-white'
        }`}
        title="打开设置对话框"
        aria-label="打开设置"
      >
        <IconCog6Tooth className="icon" />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex max-h-[92dvh] w-[calc(100vw-1.5rem)] max-w-[50rem] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-[#F7F8F9] p-0 shadow-2xl dark:border-gray-700 dark:bg-[#17181B] sm:w-200">
                  <div className="relative flex h-18 items-end justify-between rounded-t-2xl border-b border-gray-200/80 bg-white/50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900/60 sm:h-22 sm:px-6">
                    <span className="text-2xl font-bold text-gray-600 sm:text-3xl">设置</span>
                    <button
                      className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100 sm:right-5 sm:top-4"
                      type="button"
                      onClick={() => setIsOpen(false)}
                      title="关闭对话框"
                      aria-label="关闭设置"
                    >
                      <IconX className="h-6 w-6" />
                    </button>
                  </div>

                  <Tab.Group vertical>
                    <div className="flex h-[calc(92dvh-4.5rem)] min-h-0 w-full flex-col sm:h-120 sm:flex-row">
                      <Tab.List className="grid h-auto w-full shrink-0 grid-cols-2 gap-2 border-b border-gray-200/80 bg-white/30 px-3 py-2 dark:border-gray-800 dark:bg-gray-900/45 sm:flex sm:h-full sm:w-52 sm:flex-col sm:items-start sm:space-y-3 sm:overflow-visible sm:border-b-0 sm:border-r sm:px-6 sm:py-3">
                        <Tab
                          className={({ selected }) =>
                            classNames(
                              'flex h-11 w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2 ring-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 sm:h-14 sm:w-full sm:px-4',
                              selected && 'bg-gray-200 bg-opacity-50 dark:bg-gray-800',
                            )
                          }
                        >
                          <IconEar className="mr-2 text-neutral-500  dark:text-neutral-300" />
                          <span className="text-neutral-500 dark:text-neutral-300 ">音效设置</span>
                        </Tab>
                        <Tab
                          className={({ selected }) =>
                            classNames(
                              'flex h-11 w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2 ring-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 sm:h-14 sm:w-full sm:px-4',
                              selected && 'bg-gray-200 bg-opacity-50 dark:bg-gray-800',
                            )
                          }
                        >
                          <IconAdjustmentsHorizontal className="mr-2 text-neutral-500  dark:text-neutral-300" />
                          <span className="text-neutral-500 dark:text-neutral-300">高级设置</span>
                        </Tab>
                        <Tab
                          className={({ selected }) =>
                            classNames(
                              'flex h-11 w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2 ring-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 sm:h-14 sm:w-full sm:px-4',
                              selected && 'bg-gray-200 bg-opacity-50 dark:bg-gray-800',
                            )
                          }
                        >
                          <IconEye className="mr-2 text-neutral-500  dark:text-neutral-300" />
                          <span className="text-neutral-500 dark:text-neutral-300">显示设置</span>
                        </Tab>
                        <Tab
                          className={({ selected }) =>
                            classNames(
                              'flex h-11 w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2 ring-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 sm:h-14 sm:w-full sm:px-4',
                              selected && 'bg-gray-200 bg-opacity-50 dark:bg-gray-800',
                            )
                          }
                        >
                          <IconDatabaseCog className="mr-2 text-neutral-500  dark:text-neutral-300" />
                          <span className="text-neutral-500 dark:text-neutral-300">数据设置</span>
                        </Tab>
                      </Tab.List>

                      <Tab.Panels className="min-h-0 w-full flex-1">
                        <Tab.Panel className="flex h-full min-h-0 w-full focus:outline-none">
                          <SoundSetting />
                        </Tab.Panel>
                        <Tab.Panel className="flex h-full min-h-0 w-full focus:outline-none">
                          <AdvancedSetting />
                        </Tab.Panel>
                        <Tab.Panel className="flex h-full min-h-0 w-full focus:outline-none">
                          <ViewSetting />
                        </Tab.Panel>
                        <Tab.Panel className="flex h-full min-h-0 w-full focus:outline-none">
                          <DataSetting />
                        </Tab.Panel>
                      </Tab.Panels>
                    </div>
                  </Tab.Group>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
