import React from 'react';
import '../../styles/layout.css';

const Nav: React.FC = () => {
  return (
    <nav>
      <div className="nav">
        <ul>
          <left>
            <li><a href ="/">Home</a></li>
            <li><a href ="/list">List</a></li>
          </left>
          <right>
            <li><a href ="/save">Join</a></li>
            <li><a href ="/save">Login</a></li>
          </right>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;