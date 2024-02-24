import React, { ReactElement, cloneElement, isValidElement, Children } from 'react';
import useNavBar from './navbar.hooks';

interface NavbarProps {
  children: ReactElement | ReactElement[];
}
const MOBILE_WIDTH = 768;

export default function Navbar({ children }: NavbarProps) {
  const [getters, actions] = useNavBar(MOBILE_WIDTH);
  const { isMobile, expanded }: any = getters;
  const { setExpanded }: any = actions;

  const children_ = Children.map(children, (child: ReactElement) => {
    if (isValidElement(child)) {
      return cloneElement(child, { isMobile } as React.Attributes);
    }
    return child as ReactElement;
  });

  return (
    <nav role='navigation' className='bg-gray-800 child:mx-2 md:px-4 px-2'>
      <HamBurgerIcon setExpanded={setExpanded} expanded={expanded} />
      {/** Navigation Content */}
      <div
        className={`flex flex-col ${isMobile ? 'space-y-1 px-2 pb-3' : 'items-center md:h-16 md:flex-row md:space-x-4'}`}
        role='menu'
        aria-hidden={!expanded && isMobile}
      >
        {children_}
      </div>
    </nav>
  );
}

export const NavItem = ({ isMobile, text, current, href = '#' }: any) => {
  return (
    <a
      href={href}
      className={`rounded-md px-3 py-2  ${isMobile ? 'text-base' : 'text-sm'} font-medium text-gray-300 hover:bg-gray-700 hover:text-white`}
      {...(current && { 'aria-current': 'page' })}
    >
      <h4>{text}</h4>
    </a>
  );
};

const HamBurgerIcon = ({ setExpanded, expanded }: any) => (
  <div className='flex h-16 items-center justify-between focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white md:hidden'>
    <button
      type='button'
      style={{ border: '0px solid red' }}
      aria-controls='navigation-menu-button'
      onClick={() => setExpanded(!expanded)}
      className='rounded-md p-2 text-gray-300 hover:bg-gray-700 hover:text-white'
    >
      {!expanded ? (
        <svg className='block h-6 w-6' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' aria-hidden={!isMobile}>
          <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
        </svg>
      ) : (
        /*cross icon */
        <svg className='block h-6 w-6' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
        </svg>
      )}
    </button>
  </div>
);
