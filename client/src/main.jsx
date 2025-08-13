import { createRoot } from 'react-dom/client'
import './index.css'

import { StrictMode } from 'react'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(


  <StrictMode>
    <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
    </BrowserRouter>
  </StrictMode>

)
