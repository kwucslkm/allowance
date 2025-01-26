import React from 'react';
import {useEffect,useState} from 'react';
import MyHome from './pages/MyHome';
import Header from './pages/layout/Header';
import Nav from './pages/layout/Nav';
import Footer from './pages/layout/Footer';
import Main from './pages/layout/Main';
import LoginForm from './pages/control/LoginForm';
import { selecLoginCheck, joinMemberCreate } from './services/api';
import JoinForm from './pages/control/JoinForm';
import MemberList from './pages/control/MemberList';

  const App: React.FC = () => { 
    const [loginYn, setLoginYn] = useState(false); // 로그인 여부 상태
    const [showLoginForm, setShowLoginForm] = useState(false); // 로그인 폼 표
    const [showJoinForm, setShowJoinForm] = useState(false); // 로그인 폼 표
    const [showMemberList,setShowMemberList] = useState(false); // memberList
    const [managerYn, setManagerYn] = useState(false); // 사용자/관리자 구분
    // const [loginState, setLoginState] = useState({
    //   loginYn: false,
    //   managerYn: false,
    // });
    
    // let loginInfo = {loginYn:loginYn, managerYn:managerYn}
    useEffect(() => {
      const savedLoginInfo = sessionStorage.getItem("loginInfo");
      console.log("새로고침 로그인 세션 정보 =  >",savedLoginInfo);
      if (savedLoginInfo) {
        const { loginYn, managerYn } = JSON.parse(savedLoginInfo);
        console.log("새로고침 로그인유무 = > " ,loginYn);
        console.log("새로고침 관리자유무 = > " ,managerYn);
        setLoginYn(loginYn);
        setManagerYn(managerYn);
        const savedUserInfo = sessionStorage.getItem("userInfo");
        console.log(savedUserInfo);
      }
    }, []);

    let mainPageView = null;

    // 로그인 
    const loginCheck = async (userEmail: string, password: string) => {
      const memberLoginCheck = await selecLoginCheck({
        userEmail, password,
      });

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
        userEmail: string;
      }
      // 로그인 체크 응답 타입
      interface LoginCheckResponse {
        success: boolean;
        user: User;           
        message?: string;     
      }
      
      const handleLogin = (memberLoginCheck:LoginCheckResponse) => { 
        sessionStorage.setItem('memberInfo',JSON.stringify(memberLoginCheck.user)); //사용자정보 세션
        if(memberLoginCheck.user.userEmail === 'kwucsa@gmail.com'){
          setManagerYn(true); // 관리자 세팅
        }
        
        // console.log("로그인 정보 = > ",loginState);
        const loginInfo = {loginYn:loginYn, managerYn:managerYn}
        sessionStorage.setItem('loginInfo',JSON.stringify(loginInfo)); // 로그인 정보 세션
      };
      if(memberLoginCheck.success){

        setLoginYn(true);//로그인이 성공한 상태이므로 myHome을 연다
        handleLogin(memberLoginCheck);  // 로그인에 성공했으니 세션스토리지에 user 정보를 넣는 함수 호출

        setShowLoginForm(false);//로그인 폼은 닫는다.
        
      const userInfo = sessionStorage.getItem('memberInfo');
      if (userInfo) {
        // `userInfo`가 null이 아니므로 안전하게 JSON.parse 사용
        console.log('Logged-in UserInfo.id:', JSON.parse(userInfo).id);
      } 
      alert(memberLoginCheck.message);//로그인 성공
      // 로그아웃 시 아이디 제거:
      // const handleLogout = () => {

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
    // 로그아웃
    const logoutProcess = () =>{
      setLoginYn(false);
      setShowLoginForm(false);
      setShowJoinForm(false);
      setShowMemberList(false);
      sessionStorage.removeItem('memberInfo');
      console.log('memberInfo removed from session');
      alert('로그아웃 되었습니다.');
    }
    // mainPageView control
    if (showMemberList){
      mainPageView = <MemberList></MemberList>
    }else if (showJoinForm){ // 회원가입 폼
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
      <Nav _loginYn={loginYn} 
      _managerYn = {managerYn} 
      onLoginClick={()=>{
        setShowMemberList(false);
        setShowJoinForm(false);
        setShowLoginForm(true);
      }} onJoinClick={()=>{
        setShowMemberList(false);
        setShowJoinForm(true);
      }} onMemberListClick={()=>{
        setShowMemberList(true);
      }} onLogoutClick={()=>{
        logoutProcess();
        
      }}></Nav>
      {mainPageView}
      <Footer></Footer>
    </>;
  };

  export default App;

