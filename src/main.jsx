import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { SelectContextProvider } from './context/selectMenu.jsx'
import { Provider } from 'react-redux'
import { persistor, store } from './redux-toolkit/store.js'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SelectContextProvider>
          <App />
        </SelectContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
