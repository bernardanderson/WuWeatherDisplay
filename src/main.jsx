import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import App from './App.jsx'
import './store/initializeIntervals.js';

const getBasePath = () => {
    const fullPath = window.location.pathname;
    const basePath = fullPath.endsWith('/') ? fullPath : `${fullPath}/`;
    return basePath;
};

const basePath = getBasePath();
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Router basename={basePath}>
          <App
              basename={basePath}
          />
      </Router>
  </StrictMode>
)
