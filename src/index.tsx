import App from './app/App'
import './shared/config/i18n/i18n'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('app') as HTMLElement
const root = createRoot(container)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
