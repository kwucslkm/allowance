import axios from 'axios';
//import Member from './../../../allowback/src/models/Member';
const baseURL = import.meta.env.VITE_API_BASE ?? '/api'
const api = axios.create({baseURL})
// const api = axios.create({baseURL: 'http://localhost:3001/api',});

export const findMemberAll = async () => {
  const response = await api.get('/allowances/members');
  return response.data;
};

export const createAllowance = async (
  data: { 
    description: string; 
    amount: number; 
    category:string;
    store?:string;
    memberId:number;
  }) => {
  const response = await api.post('/allowances', data);
  return response.data;
};
export const joinMemberCreate = async (
  data: { 
    nickname : string;
    password : string;
    birthday : string;
    name : string;
    city : string;
    mobile? : string;
    userEmail? : string;
    ori_yearAllowance:number;
    yearAllowance:number;
  }) => {
  try{
    // 입력값 유효성 검사
    if ( !data.password || !data.nickname || !data.birthday) {
    throw new Error('필수 입력값이 누락되었습니다.');
    }

    // 이메일(아이디) 형식 검사
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(data.userEmail)) {
    //   throw new Error('올바른 이메일 형식이 아닙니다.');
    // }

    // 휴대폰 번호 형식 검사
    // const mobileRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
    // if (!mobileRegex.test(data.mobile)) {
    //   throw new Error('올바른 휴대폰 번호 형식이 아닙니다.');
    // }
    const response = await api.post('/allowances/memberCreate', data);
    return{
      success:true,
      data:response.data
    }
  }catch(error: any){
    if(error.response){
      return{
        success:false,
        // error:error.message/
        error:error.response.data.error || '회원가입 처리 중 서버 오류가 발생했습니다.'
      };
    }
  };
  // 기타 예상치 못한 에러
  return {
    success: false,
    error:  '회원가입 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
  };
};
//로그인
export const selecLoginCheck = async (
  data: {
    nickname: string;
    password: string;
  }
) => {
  try {
    const response = await api.post('/allowances/loginCheck', data);
    console.log("api ddan response 2 ",response);
    return response.data;  // 성공 시 response.data 반환
  } catch (error) {
    // 에러가 발생한 경우
    if (axios.isAxiosError(error)) {
      // AxiosError일 경우
      alert(error.response?.data?.message || '로그인 체크 Unknown error'); //
      return false;
      // throw new Error(error.response?.data?.message || 'Unknown error');  // 에러 던지기
    }
    throw error;  // 다른 종류의 에러는 다시 던지기
  }
};
export const fetchAllowances = async (memberId:number) => {
  try{
    console.log("memberId to router 2 = > ", memberId);
    const response = await api.post('/allowances/findAlloanceByMemberId',{memberId});
    return response.data;
  }catch(error){
    // 에러가 발생한 경우
    if (axios.isAxiosError(error)) {
      // AxiosError일 경우
      alert(error.response?.data?.message || 'Unknown error');
      return false;
      // throw new Error(error.response?.data?.message || 'Unknown error');  // 에러 던지기
    }
    throw error;  // 다른 종류의 에러는 다시 던지기
  }
};
export const updateAllowance = async(
  data:{
    amount:number;
    remainAllow:number;
    memberId:number;
  }
) =>{
  try{
    console.log("data to router  = > ", data);
    const response = await api.post('/allowances/updateMemberAllowance',data);
    return response.data;
  }catch(error){
    // 에러가 발생한 경우
    if (axios.isAxiosError(error)) {
      // AxiosError일 경우
      alert(error.response?.data?.message || 'Unknown error');
      return false;
      // throw new Error(error.response?.data?.message || 'Unknown error');  // 에러 던지기
    }
    throw error;  // 다른 종류의 에러는 다시 던지기
  }
}

export default api;
