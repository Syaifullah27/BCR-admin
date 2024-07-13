import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { SelectContextProvider } from './context/selectMenu.jsx'
import { Provider } from 'react-redux'
import  store  from './redux-toolkit/store.js'
import { SearchCarshProvider } from './context/searchCars.jsx'
import PopupProvider from './context/messagePopup.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <PopupProvider>
          <SearchCarshProvider>
            <SelectContextProvider>
              <App />
            </SelectContextProvider>
          </SearchCarshProvider>
        </PopupProvider>
    </Provider>
  </React.StrictMode>,
)
