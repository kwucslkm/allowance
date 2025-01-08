import React from 'react';
import styles from '../styles/Header.module.css'; // CSS 파일 import

const Header: React.FC = () => {
  return (
    <header>
      <div className='header'>
        <h2>I am header!!!</h2>
      </div>
    </header>
  );
};

export default Header;