import App from './app/App'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './app/providers/ThemeProvider'
import './shared/config/i18n/i18n'
import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from './app/providers/ErrorBoundary'

const container = document.getElementById('app') as HTMLElement
const root = createRoot(container) // createRoot(container!) if you use TypeScript
root.render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
)
