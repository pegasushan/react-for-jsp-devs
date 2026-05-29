/**
 * main.jsx — 애플리케이션 진입점
 *
 * JSP 비교:
 *   JSP:   web.xml → DispatcherServlet → Controller → View
 *   React: main.jsx → App.jsx → Router → Page 컴포넌트
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// public/index.html의 <div id="root"> 에 React 앱 마운트
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
