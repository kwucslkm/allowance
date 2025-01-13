  import React from 'react';
  import {useState} from 'react';
  import Home from './pages/Home.tsx';
  import Header from './pages/layout/Header.tsx';
  import Nav from './pages/layout/Nav.tsx';
  import Footer from './pages/layout/Footer.tsx';
  import Main from './pages/Main.tsx';
  import LoginForm from './pages/control/LoginForm.tsx';
  import { selecLoginCheck } from './services/api.ts';


  const App: React.FC = () => {
    const [loginYn, setLoginYn] = useState(false); // 로그인 여부 상태
    const [showLoginForm, setShowLoginForm] = useState(false); // 로그인 폼 표
    let mainPageView = null;
    const loginCheck = async (userEmail: string, password: string) => {
      console.log("userEmail, password = > ",userEmail,password);
      const memberLoginCheck = await selecLoginCheck({
        userEmail,
        password,
      });
      console.log(memberLoginCheck);
      if(memberLoginCheck.success){
        setLoginYn(true);
        setShowLoginForm(false);
        alert(memberLoginCheck.message);
      }else {
        alert('다시 확인 하시고 시도 하세요');
        // setShowLoginForm(true);

      }
      
    };
    if (showLoginForm){ 
      mainPageView = <LoginForm 
        onSubmit={(_userEmail,_password)=>{
          const userEmail = _userEmail;
          const password = _password;
          loginCheck(userEmail,password);
      }}></LoginForm>
    }else if(loginYn){
      mainPageView = <Home></Home>
    } else {
      mainPageView = <Main></Main>
    }
    return <>
      <Header />
      <Nav onLoginClick={()=>{
        setShowLoginForm(true);
      }}></Nav>
      {mainPageView}
      <Footer></Footer>
    </>;
  };

  export default App;

