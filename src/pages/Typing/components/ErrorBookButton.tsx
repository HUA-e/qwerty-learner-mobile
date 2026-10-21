import { recordErrorBookAction } from '@/utils'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import IconBook from '~icons/bxs/book'

const ErrorBookButton = () => {
  const navigate = useNavigate()

  const toErrorBook = useCallback(() => {
    navigate('/error-book')
    recordErrorBookAction('open')
  }, [navigate])

  return (
    <button
      type="button"
      onClick={toErrorBook}
      className={`flex items-center justify-center rounded p-[2px] text-lg text-gray-800 dark:text-gray-200 outline-none transition-colors duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800`}
      title="查看错题本"
    >
      <IconBook className="icon" />
    </button>
  )
}

export default ErrorBookButton
