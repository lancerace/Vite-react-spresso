import './globals.scss';
import _ from 'lodash';
import { useLocation, Outlet } from 'react-router-dom';
import Navbar, { NavItem } from './components/NavBar/NavBar';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();
function App() {
  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <div className='w-screen flex-col'>
        <Navbar>
          {['Users', 'Posts'].map((text, index) => (
            <NavItem key={index + '_navbar'} text={text} current={location.pathname === '/' + _.lowerFirst(text)} href={_.lowerFirst(text)} />
          ))}
        </Navbar>
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}

export default App;
