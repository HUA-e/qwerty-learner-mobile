import type { PropsWithChildren } from 'react'
import type React from 'react'

const Header: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <header className="container z-20 mx-auto w-full px-3 py-3 sm:px-8 sm:py-5">
      <nav className="my-card mx-auto flex w-full max-w-full content-center items-center justify-start gap-1 overflow-x-auto rounded-2xl p-2 transition-colors duration-300 sm:justify-center sm:gap-0 sm:space-x-2 sm:overflow-visible sm:p-3">
        {children}
      </nav>
    </header>
  )
}

export default Header
