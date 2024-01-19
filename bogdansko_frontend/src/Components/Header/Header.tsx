import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.title}>Your Company Name</div>
      <div className={styles.navWrapper}>
        <div  className={styles.navLink}>Home</div>
        <div  className={styles.navLink}>Menu</div>
        <div  className={styles.navLink}>Contact</div>
      </div>
    </div>
  );
};

export default Header;
