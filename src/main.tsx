import React from 'react'
import ReactDOM from 'react-dom/client'
import URLShortenerApp from './URLShortenerApp.tsx'
import './index.css'
import { Footer } from './components/Footer.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <URLShortenerApp />
    <Footer />
  </React.StrictMode>,
)
