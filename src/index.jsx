import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import setupStore from './redux/redux'
import App from './App'
import './index.css'

const store = setupStore()

const root = ReactDOM.createRoot(
  document.getElementById('root'),
)
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
)
