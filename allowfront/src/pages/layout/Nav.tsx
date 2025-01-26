  import React, { useState } from 'react';
  import '../../styles/layout.css';
  
  interface NavProps {
    _managerYn : boolean;
    _loginYn : boolean;
    onLoginClick():void;
    onJoinClick():void;
    onMemberListClick():void;
    onLogoutClick():void;
  }

  const Nav: React.FC<NavProps> = ({_managerYn,_loginYn,onMemberListClick, onLoginClick, onJoinClick, onLogoutClick}) => {
    const memberInfo = sessionStorage.getItem("memberInfo");
    const nickname:string = memberInfo?JSON.parse(memberInfo).nickname : null;
    return (
      <nav>
        <div className="nav container ">
          <ul>
            <span className="left">
              <li><a href ="/">Home</a></li>
              {_managerYn && (<li><a href ="/list" onClick={e=>{
                e.preventDefault();
                onMemberListClick();
              }}>MemberList</a></li>)}
            </span>
            <span className="right">
              {!_loginYn && (<li><a href ="/join" onClick={e=>{
                e.preventDefault();
                onJoinClick();
              }}>Join</a></li>
              )}
              {!_loginYn && (
                <li><a href ="/login" onClick={e=>{
                  e.preventDefault();
                  onLoginClick();
                }}>Login</a></li>
              )}
              {_loginYn && (
                <li><a href ="/logout" onClick={e=>{
                  e.preventDefault();
                  
                }}>{_managerYn && "(관리자) "}{nickname}님 환영합니다.</a></li>
              )}
              {_loginYn && (
                <li><a href ="/logout" onClick={e=>{
                  e.preventDefault();
                  onLogoutClick();
                }}>Logout</a></li>
              )}
              
              
            </span>
          </ul>
        </div>
      </nav>
    );
  };

  export default Nav;