  import React from 'react';
  import '../../styles/layout.css';
  
  interface NavProps {
    onLoginClick():void;
    onJoinClick():void;
  }
  const Nav: React.FC<NavProps> = ({onLoginClick, onJoinClick}) => {

    return (
      <nav>
        <div className="nav container ">
          <ul>
            <span className="left">
              <li><a href ="/">Home</a></li>
              <li><a href ="/list">List</a></li>
            </span>
            <span className="right">
              <li><a href ="/join" onClick={e=>{
                e.preventDefault();
                onJoinClick();
              }}>Join</a></li>
              <li><a href ="/login" onClick={e=>{
                e.preventDefault();
                onLoginClick();
              }}>Login</a></li>
            </span>
          </ul>
        </div>
      </nav>
    );
  };

  export default Nav;