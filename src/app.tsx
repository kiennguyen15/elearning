import './index.css';
import { BrowserRouter, useLocation } from 'react-router-dom';
import AppRoutes from './routes';
import Header from './screen/component/header';
import Sidebar from './screen/component/sidebar';
import Footer from './screen/component/footer';
import { useState } from 'react';
import { AppProvider } from './context/AppContext';

const baseHref = document.querySelector('base')?.getAttribute('href')?.replace(/\/$/, '') || '';

const AppLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const onToggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className="app-container">
      <div className="flex">
        {!isLoginPage && (
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        )}
        <div className="flex-1">
          {!isLoginPage && (
            <Header onToggleSidebar={onToggleSidebar} />
          )}
          <div id="app-view-container">
            <AppRoutes />
            {!isLoginPage && <Footer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export const App = () => {
  return (
    <AppProvider>
      <BrowserRouter basename={baseHref}>
        <AppLayout />
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
