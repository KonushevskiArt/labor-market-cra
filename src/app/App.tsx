import './styles/index.scss'
import { ThemeProvider } from 'app/providers/ThemeProvider'
import AppLayout from './Layout/Layout'
import { StoreProvider } from './providers/StoreProvider'
import { type FC } from 'react'
import './firebase.ts'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from './providers/ErrorBoundary'

const App: FC = () => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <ThemeProvider>
              <AppLayout />
          </ThemeProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App
