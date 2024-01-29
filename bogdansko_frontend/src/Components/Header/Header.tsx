import React from 'react';
import './Header.css';
import { Button } from 'antd';
const Header = ({companyName,onLogout}:any) => {
  return (
    <div className='headerWrapper'>
      <div className='title'>{companyName}</div>
      <Button onClick={onLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Header;
