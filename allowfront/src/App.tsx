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
import {User, LoginCheckResponse} from './ts_ts/types';


  const App: React.FC = () => { 
    const [loginYn, setLoginYn] = useState(false); // 로그인 여부 상태
    const [showLoginForm, setShowLoginForm] = useState(false); // 로그인 폼 표
    const [showJoinForm, setShowJoinForm] = useState(false); // 로그인 폼 표
    const [showMemberList,setShowMemberList] = useState(false); // memberList
    const [managerYn, setManagerYn] = useState(false); // 사용자/관리자 구분
    const [goHmoeYn, setGoHomeYn] = useState(false); // 홈으로, 새로고침

    useEffect(() => {
      // const loginUserInfo = sessionStorage.getItem("userInfo");
      // console.log("새로고침을 위한 세션 유저 정보 = > ",loginUserInfo);
      const savedLoginInfo = sessionStorage.getItem("loginInfo");
      // console.log("새로고침 로그인 세션 정보 =  >",savedLoginInfo);
      if (savedLoginInfo) {
        const { loginYn, managerYn } = JSON.parse(savedLoginInfo);
        console.log("새로고침 로그인유무 = > " ,loginYn);
        console.log("새로고침 관리자유무 = > " ,managerYn);
        setLoginYn(loginYn);
        setManagerYn(managerYn);
        setGoHomeYn(true);
        const savedUserInfo = sessionStorage.getItem("userInfo");
        console.log(savedUserInfo);
      }
    }, []);

    let mainPageView = null;

    // 로그인 
    const loginCheck = async (userEmail: string, password: string) => {
      // 1. 입력 받은 유저이메일과 비밀번호를 서버로 보내서 db에서 체크한 결과값(객체)을 받는다.
      const memberLoginCheck = await selecLoginCheck({
        userEmail, password,
      });
      // 유저 정보 타입 (interface) 정의 => ./types.ts/User import
      // 로그인 체크 응답 타입(interface) 정의 => ./types.ts/LoginCheckResponse import
      // 2-1 . 로그인체크(아이디, 패스워드) 성공 후 세션스토리지에 사용자 정보 넣기
      const handleLogin = (memberLoginCheck:LoginCheckResponse) => { 
        const loginUserEmail = memberLoginCheck.user.userEmail;
        
        sessionStorage.setItem('memberInfo',JSON.stringify(memberLoginCheck.user)); //사용자정보 세션
        if(loginUserEmail === 'kwucsa@gmail.com'){
          setManagerYn(true); // is관리자 세팅
        }
        // console.log("memberLoginCheck.user.userEmail = ",memberLoginCheck.user.userEmail )

        console.log(" 세션에 로그인정보 넣기 전 loginYn = "+loginYn, "managerYn = "+managerYn);
        const loginInfo = {loginYn:true, managerYn:loginUserEmail === 'kwucsa@gmail.com'}
        sessionStorage.setItem('loginInfo',JSON.stringify(loginInfo)); // 로그인 정보 세션
      };
      if(memberLoginCheck.success){  // 2. 로그인성공 시 로직
        setShowLoginForm(false);//로그인 폼은 닫는다.
        setLoginYn(true);//로그인이 성공한 상태이므로 myHome을 연다
        // console.log("로그인 성공 후 로그인성공 상태를 바꾸고 세션에 담기 전 = ",loginYn);/
        handleLogin(memberLoginCheck);  // 2.1 로그인에 성공 세션스토리지에 user 정보를 넣는 함수 호출
        const userInfo = sessionStorage.getItem('memberInfo'); // 3. 세션에 사용자 정보를 꺼낸다.
      if (userInfo) { //사용자 id 정보 콘솔에 출력
        // `userInfo`가 null이 아니므로 안전하게 JSON.parse 사용
        console.log('Logged-in UserInfo.id:', JSON.parse(userInfo).id);
      } 
      alert(memberLoginCheck.message);// 4. 로그인 성공 메세지알림을 띄워준다.
      }else { // 로그인 실패(db에서 아이디/패스워드 정보 조회 실패) 시 알림
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
      setManagerYn(false);
      
      sessionStorage.removeItem('memberInfo');
      sessionStorage.removeItem('loginInfo');
      console.log('memberInfo removed from session',sessionStorage.getItem('memberInfo'));
      console.log('loginInfo removed from session',sessionStorage.getItem('loginInfo'));
      alert('로그아웃 되었습니다.');
    }
    // mainPageView control
    if (goHmoeYn){
      mainPageView = <Main></Main>
    } else if (showMemberList){
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
      onMyPageClick={()=>{
        setGoHomeYn(false);
        setShowMemberList(false);
        setLoginYn(true);
      }}
      onHomeClick={()=>{
        setGoHomeYn(true);
      }}
      onLoginClick={()=>{
        setGoHomeYn(false);
        setShowMemberList(false);
        setShowJoinForm(false);
        setShowLoginForm(true);
      }} onJoinClick={()=>{
        setGoHomeYn(false);
        setShowMemberList(false);
        setShowJoinForm(true);
      }} onMemberListClick={()=>{
        setGoHomeYn(false);
        setShowMemberList(true);
      }} onLogoutClick={()=>{
        logoutProcess();
        
      }}></Nav>
      {mainPageView}
      <Footer></Footer>
    </>;
  };

  export default App;

