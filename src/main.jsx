import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import App from './App.jsx'
import './store/initializeIntervals.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Router>
          <App />
      </Router>
  </StrictMode>
)
