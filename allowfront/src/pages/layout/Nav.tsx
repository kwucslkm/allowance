import React, { useEffect, useState } from "react";
import "../../styles/layout.css";

interface NavProps {
  _managerYn: boolean;
  _loginYn: boolean;
  onMyPageClick():void;
  onLoginClick(): void;
  onJoinClick(): void;
  onMemberListClick(): void;
  onLogoutClick(): void;
  onHomeClick():void;
}

const Nav: React.FC<NavProps> = ({
  _managerYn,
  _loginYn,
  onMyPageClick,
  onHomeClick,
  onMemberListClick,
  onLoginClick,
  onJoinClick,
  onLogoutClick,
}) => {
  const memberInfo = sessionStorage.getItem("memberInfo");
  const nickname: string = memberInfo ? JSON.parse(memberInfo).nickname : null;
  return (
    <nav>
      <div className="nav container ">
        <ul>
          <div id="grid">
            <span className="left">
              <li>
                <a href="/" onClick={(e)=>{
                  e.preventDefault();
                  onHomeClick();
                }}>홈으로(Home)</a>
              </li>
              {_managerYn && (
                <li>
                  <a href="/list" onClick={(e) => {
                      e.preventDefault();
                      onMemberListClick();
                    }}> 회원목록(list) </a>
                </li>
              )}
            </span>
            <span className="right"> 
              {!_loginYn && (
                <li>
                  <a href="/join" onClick={(e) => {
                      e.preventDefault();
                      onJoinClick();
                    }}> 회원가입(Join) </a>
                </li>
              )}
              {!_loginYn && (
                <li>
                  <a href="/login" onClick={(e) => {
                      e.preventDefault();
                      onLoginClick();
                    }}> 로그인(Login) </a>
                </li>
              )}
              {_loginYn && (
                <li>
                  <a href="/myPage" onClick={(e) => {
                      e.preventDefault();
                      onMyPageClick();
                    }}> {_managerYn && "(관리자) "} {nickname}님 환영합니다. </a>
                </li>
              )}
              {_loginYn && (
                <li>
                  <a href="/logout" onClick={(e) => {
                      e.preventDefault();
                      onLogoutClick();
                    }}> Logout </a>
                </li>
              )}
            </span>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
