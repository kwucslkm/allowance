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
export const selecLoginCheck = async (
  data : {
    userEmail: string;
    password: string;
  }
) => {
  const response = await api.post('/loginCheck', data);
  return response.data;
};

export default api;
