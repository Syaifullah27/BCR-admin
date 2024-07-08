import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { SelectContextProvider } from './context/selectMenu.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SelectContextProvider>
      <App />
    </SelectContextProvider>
  </React.StrictMode>,
)
