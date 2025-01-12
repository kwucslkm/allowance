  import React from 'react';
  import {useState} from 'react';
  import Home from './pages/Home.tsx';
  import Header from './pages/layout/Header.tsx';
  import Nav from './pages/layout/Nav.tsx';
  import Footer from './pages/layout/Footer.tsx';
  import Main from './pages/Main.tsx';
  import LoginForm from './pages/control/LoginForm.tsx';


  const App: React.FC = () => {
    const [loginYn, setLoginYn] = useState(false); // 로그인 여부 상태
    const [showLoginForm, setShowLoginForm] = useState(false); // 로그인 폼 표
    let mainPageView = null;

    if (showLoginForm){ 
      mainPageView = <LoginForm></LoginForm>
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

