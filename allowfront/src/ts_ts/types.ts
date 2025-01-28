// 유저 정보 타입
export interface User {
  id: number;
  birthday: string;
  city: string;
  createAt: string;
  joinDate: string;
  mobile: string;
  nickname: string;
  password: string;
  updatedAt: string;
  name: string;
  userEmail: string;
}
export interface LoginCheckResponse {
  success: boolean;
  user: User;           
  message?: string;     
}