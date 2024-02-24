import './globals.scss';
import _ from 'lodash';
import { useLocation, Outlet } from 'react-router-dom';
import Navbar, { NavItem } from './components/NavBar/NavBar';

function App() {
  const location = useLocation();
  return (
    <div className='w-screen flex-col'>
      <Navbar>
        {['Users', 'Posts'].map((text, index) => (
          <NavItem key={index + '_navbar'} text={text} current={location.pathname === '/' + _.lowerFirst(text)} href={_.lowerFirst(text)} />
        ))}
      </Navbar>
      <Outlet />
    </div>
  );
}

export default App;
