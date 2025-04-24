import './index.css';
import { BrowserRouter, useLocation } from 'react-router-dom';
import AppRoutes from './routes';
import Header from './screen/component/header';
import Sidebar from './screen/component/sidebar';
import Footer from './screen/component/footer';

const baseHref = document.querySelector('base')?.getAttribute('href')?.replace(/\/$/, '') || '';

const AppLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="app-container">
      <div className="flex">
        {!isLoginPage && <Sidebar />}
        <div className="flex-1">
          {!isLoginPage && <Header />}
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
    <BrowserRouter basename={baseHref}>
      <AppLayout />
    </BrowserRouter>
  );
};

export default App;
