/* eslint-disable no-unused-vars */
// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './Auth/Login.jsx'
import { ThemeProvider } from './theme/ThemeProvider.jsx'
// import Register from './Auth/Register.jsx'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  // <App />
  <ThemeProvider>
    <App />
  </ThemeProvider>
  // </React.StrictMode>,
)
