  import React from 'react';
  import {useState} from 'react';
  import MyHome from './pages/MyHome';
  import Header from './pages/layout/Header';
  import Nav from './pages/layout/Nav';
  import Footer from './pages/layout/Footer';
  import Main from './pages/layout/Main';
  import LoginForm from './pages/control/LoginForm';
  import { selecLoginCheck, joinMemberCreate } from './services/api';
  import JoinForm from './pages/control/JoinForm';

  const App: React.FC = () => {
    const [loginYn, setLoginYn] = useState(false); // 로그인 여부 상태
    const [showLoginForm, setShowLoginForm] = useState(false); // 로그인 폼 표
    const [showJoinForm, setShowJoinForm] = useState(false); // 로그인 폼 표
    let mainPageView = null;
    // 로그인 
    const loginCheck = async (userEmail: string, password: string) => {
      // console.log("보낼 userEmail, password = > ",userEmail,password);
      const memberLoginCheck = await selecLoginCheck({
        userEmail, password,
      });
      // console.log("memberLoginCheck= " ,memberLoginCheck);
      // console.log("user id = ", memberLoginCheck.user.id);
      // 유저 정보 타입
      interface User {
        id: number;
        birthday: string;
        city:string;
        createAt:string;
        joinDate:string;
        mobile:string;
        nickname:string;
        password:string;
        updatedAt:string;
        name: string;
        useremail: string;
      }
      // 로그인 체크 응답 타입
      interface LoginCheckResponse {
        success: boolean;
        user: User;           // 성공 시 유저 정보
        message?: string;      // 실패 시 메시지
      }
      
      const handleLogin = (memberLoginCheck:LoginCheckResponse) => {
        sessionStorage.setItem('memberInfo',JSON.stringify(memberLoginCheck.user));
      };
      if(memberLoginCheck.success){
        setLoginYn(true);
        setShowLoginForm(false);
        handleLogin(memberLoginCheck);      
      const userInfo = sessionStorage.getItem('memberInfo');
      if (userInfo) {
        // `userInfo`가 null이 아니므로 안전하게 JSON.parse 사용
        console.log('Logged-in UserInfo.id:', JSON.parse(userInfo).id);
      } 
      alert(memberLoginCheck.message);
      //로그아웃 시 아이디 제거:
      // const handleLogout = () => {
      //   sessionStorage.removeItem('memberInfo');
      //   console.log('memberInfo removed from session');
      // };
        
      }else {
        alert('다시 확인 하시고 시도 하세요');
        // setShowLoginForm(true);
      }
    };
    // 회원 가입
    const joinMember = async (userEmail:string,password:string,mobile:string,
                              nickname:string,name:string,birthday:string,city:string) =>{
      const memberCreateResult = await joinMemberCreate({
        userEmail,password,mobile,nickname,name,birthday,city,
      });
      console.log("memberCreateResult = ",memberCreateResult);
      if (memberCreateResult.success){
        alert('회원가입 되었습니다. Join Success');
        setShowJoinForm(false);
        setShowLoginForm(true);
      }else{
        alert(memberCreateResult.error);
        setShowJoinForm(true);
        
      }
    };
    if (showJoinForm){ // 회원가입 폼
      mainPageView = <JoinForm onSubmit={(_userEmail, _password, _mobile, _nickname, _name, _birthday,_city)=>{
        const userEmail = _userEmail;
        const password = _password;
        const mobile = _mobile;
        const nickname = _nickname;
        const name = _name;
        const birthday = _birthday;
        const city = _city;
        joinMember(userEmail,password,mobile,nickname,name,birthday,city);
      }}></JoinForm>

    }else if (showLoginForm){ 
      mainPageView = <LoginForm 
        onSubmit={(_userEmail, _password) => {
          const userEmail = _userEmail;
          const password = _password;
          loginCheck(userEmail, password);
        } } 
      ></LoginForm>
    }else if(loginYn){
      mainPageView = <MyHome></MyHome>
    } else {
      mainPageView = <Main></Main>
    }
    return <>
      <Header />
      <Nav onLoginClick={()=>{
        setShowJoinForm(false);
        setShowLoginForm(true);
      }} onJoinClick={()=>{
        setShowJoinForm(true);
      }}></Nav>
      {mainPageView}
      <Footer></Footer>
    </>;
  };

  export default App;

