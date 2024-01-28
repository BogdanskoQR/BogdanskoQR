import React from 'react';
import './Header.css';
import { companyDetails } from '@/data/drinksData';
const Header = () => {
  return (
    <div className='headerWrapper'>
      <div className='title'>{companyDetails.name}</div>
    </div>
  );
};

export default Header;
