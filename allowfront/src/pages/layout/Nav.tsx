  import React from 'react';
  import '../../styles/layout.css';
  

  const Nav: React.FC = (props) => {

    return (
      <nav>
        <div className="nav container ">
          <ul>
            <span className="left">
              <li><a href ="/">Home</a></li>
              <li><a href ="/list">List</a></li>
            </span>
            <span className="right">
              <li><a href ="/save">Join</a></li>
              <li><a href ="/login" onClick={e=>{
                e.preventDefault();
                props.onLoginClick();
              }}>Login</a></li>
            </span>
          </ul>
        </div>
      </nav>
    );
  };

  export default Nav;