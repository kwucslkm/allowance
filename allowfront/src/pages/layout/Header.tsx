import React from 'react';
import styles from '../../styles/Header.module.css'; 

const Header: React.FC = () => {
  return (
    <header>
      <div className = {styles.header}>
        <h1 className='header'>Allowance System</h1> 
      </div>
    </header>
  );
};

export default Header;