  import React from 'react';
  import {useState} from 'react';
  import Home from './pages/Home';
  import Header from './pages/layout/Header';
  import Nav from './pages/layout/Nav';
  import Footer from './pages/layout/Footer';
  import Main from './pages/Main';
  import LoginForm from './pages/control/LoginForm';
  import { selecLoginCheck } from './services/api';
  import JoinForm from './pages/control/JoinForm';



  const App: React.FC = () => {
    const [loginYn, setLoginYn] = useState(false); // 로그인 여부 상태
    const [showLoginForm, setShowLoginForm] = useState(false); // 로그인 폼 표
    const [showJoinForm, setshowJoinForm] = useState(false); // 로그인 폼 표
    let mainPageView = null;
    const loginCheck = async (userEmail: string, password: string) => {
      console.log("userEmail, password = > ",userEmail,password);
      const memberLoginCheck = await selecLoginCheck({
        userEmail,
        password,
      });
      console.log("memberLoginCheck= " ,memberLoginCheck);
      if(memberLoginCheck.success){
        setLoginYn(true);
        setShowLoginForm(false);
        alert(memberLoginCheck.message);
      }else {
        alert('다시 확인 하시고 시도 하세요');
        // setShowLoginForm(true);
      }
    };
    if (showJoinForm){
      mainPageView = <JoinForm onSubmit={(_userEmail, _password, _mobile, _nickname, _name, _birthday,_city)=>{
        const userEmail = _userEmail;
        const password = _password;
        const mobile = _mobile;
        const nickname = _nickname;
        const name = _name;
        const birthday = _birthday;
        const city = _city;
        // joinMember(userEmail,password,mobile,nickname,name,birthday,city);
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
      mainPageView = <Home></Home>
    } else {
      mainPageView = <Main></Main>
    }
    return <>
      <Header />
      <Nav onLoginClick={()=>{
        setShowLoginForm(true);
      }} onJoinClick={()=>{
        setshowJoinForm(true);
      }}></Nav>
      {mainPageView}
      <Footer></Footer>
    </>;
  };

  export default App;

