import React from 'react';
import Topbar from './Topbar';
import Navbar from './Navbar';

const Header = () => {
  return (
    <header className="fixed w-full top-0 z-50 flex flex-col pointer-events-none">
      <Topbar />
      <Navbar />
    </header>
  );
};

export default Header;
