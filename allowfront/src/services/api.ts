import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export const fetchAllowances = async () => {
  const response = await api.get('/allowances');
  return response.data;
};

export const createAllowance = async (
  data: { 
    description: string; 
    amount: number; 
    date: string;
    category:string;
    store:string;
    memberId:number;
  }) => {
  const response = await api.post('/allowances', data);
  return response.data;
};
export const joinMemberCreate = async (
  data: { 
    userEmail : string;
    password : string;
    mobile : string;
    nickname : string;
    name : string;
    birthday : string;
    city : string;
  }) => {
  const response = await api.post('/allowances/memberCreate', data);
  return response.data;
};
export const selecLoginCheck = async (
  data: {
    userEmail: string;
    password: string;
  }
) => {  
  try {
    const response = await api.post('/allowances/loginCheck', data);
    return response.data;  // 성공 시 response.data 반환
  } catch (error) {
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

export default api;
