import React from 'react';
import styles from  '../../styles/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className={styles.footer}>
       <h3>&copy;2025 lkm, Inc</h3>
      </div>
    </footer>
  );
};

export default Footer;