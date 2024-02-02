import React from 'react';
import './Header.css';
import { Button } from 'antd';

const Header = ({ companyName, onLogout,logoUrl }: any) => {
  return (
    <div className='headerWrapper'>
      <img src={logoUrl} alt='Company Logo' className='logo' />
      <div className='title'>{companyName}</div>
      <Button className='logoutButton' onClick={onLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Header;
