// 유저 정보 타입
export interface User {
  id?: number;
  nickname: string;
  password: string;
  birthday: string;
  name: string;
  city: string;
  mobile?: string;
  userEmail?: string;
  yearAllowance: number;

}
// 로그인체크(email, password 조회회) 로직 후 리턴 된 객체 타입
export interface LoginCheckResponse {
  success: boolean;
  user: User;           
  message?: string;     
}

export interface Allow {

  id?: number;
  category: string;
  store?: string;
  createdAt?:String;
  description: string;
  amount: number;
  memberId : number;
}
