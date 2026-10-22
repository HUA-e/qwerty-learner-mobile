import Loading from './components/Loading'
import './index.css'
import { ErrorBook } from './pages/ErrorBook'
import { FriendLinks } from './pages/FriendLinks'
import MobilePage from './pages/Mobile'
import TypingPage from './pages/Typing'
import { isOpenDarkModeAtom } from '@/store'
import { Analytics } from '@vercel/analytics/react'
import 'animate.css'
import { useAtomValue } from 'jotai'
import mixpanel from 'mixpanel-browser'
import React, { Suspense, lazy, useEffect } from 'react'
import 'react-app-polyfill/stable'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

const AnalysisPage = lazy(() => import('./pages/Analysis'))
const GalleryPage = lazy(() => import('./pages/Gallery-N'))

const analyticsEnabled = import.meta.env.VITE_ENABLE_ANALYTICS === 'true'
const baseUrl = import.meta.env.BASE_URL
const routerBasename = baseUrl === '/' ? '' : baseUrl.replace(/\/$/, '')

if (analyticsEnabled) {
  mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN || 'bdc492847e9340eeebd53cc35f321691')
}

function Root() {
  const darkMode = useAtomValue(isOpenDarkModeAtom)
  useEffect(() => {
    darkMode ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
  }, [darkMode])

  return (
    <React.StrictMode>
      <BrowserRouter basename={routerBasename}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route index element={<TypingPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/analysis" element={<AnalysisPage />} />
            <Route path="/error-book" element={<ErrorBook />} />
            <Route path="/friend-links" element={<FriendLinks />} />
            <Route path="/mobile" element={<MobilePage />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      {analyticsEnabled && <Analytics />}
    </React.StrictMode>
  )
}

const container = document.getElementById('root')

if (container) {
  container.innerHTML = ''
  createRoot(container).render(<Root />)
}
