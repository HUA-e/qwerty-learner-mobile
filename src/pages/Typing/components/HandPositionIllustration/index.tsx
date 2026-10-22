import standTypingHandPosition from '@/assets/standard_typing_hand_position.png'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import IconKeyboard from '~icons/ic/round-keyboard'
import IconX from '~icons/tabler/x'

export default function HandPositionIllustration({ showLabel = false }: { showLabel?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        aria-label="指法图示"
        className={
          showLabel
            ? 'flex w-full items-center gap-3 rounded-xl px-1 py-3 text-left text-sm font-medium text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
            : `flex items-center justify-center rounded p-[2px] text-lg text-gray-800 dark:text-gray-200 outline-none transition-colors duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800 ${
                isOpen && 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-950'
              }`
        }
      >
        <IconKeyboard className="icon text-gray-500"></IconKeyboard>
        {showLabel && <span>指法图示</span>}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[60]" onClose={closeModal}>
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
                <Dialog.Panel className="relative max-h-[calc(100dvh-2rem)] w-[calc(100vw-1.5rem)] max-w-[50rem] transform overflow-y-auto rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all dark:bg-gray-800 sm:p-6">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="关闭指法图示"
                    className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                  >
                    <IconX className="h-6 w-6" />
                  </button>
                  <Dialog.Title as="h3" className="text-center text-xl font-medium leading-6 text-gray-800 dark:text-gray-200">
                    推荐打字指法图示
                  </Dialog.Title>
                  <div className="mt-8">
                    <img className="block " src={standTypingHandPosition} alt="" />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
