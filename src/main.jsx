import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterLuxon} from "@mui/x-date-pickers/AdapterLuxon";
import "@fontsource/lato";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <App />
    </LocalizationProvider>
  </React.StrictMode>,
)
