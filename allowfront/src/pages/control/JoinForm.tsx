import React from 'react';
import '../../styles/layout.css';

interface JoinFormProps {
  onSubmit: (nickname:string, password: string, birthday:string,
              name:string, city:string, mobile:string, userEmail: string, yearAllowance: number
            ) => void; // 로그인 제출 이벤트
  
}
const JoinForm: React.FC<JoinFormProps> = ({ onSubmit }) => {
  const handleLoginCheck = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nickname = formData.get('nickname') as string;
    const password = formData.get('password') as string;
    const birthday = formData.get('birthday') as string;
    const name = formData.get('name') as string;
    const city = formData.get('city') as string;
    const mobile = formData.get('mobile') as string;
    const userEmail = formData.get('userEmail') as string;
    const value = formData.get('yearAllowance');
    const yearAllowance = value ? Number(value as string) : 0 ;
    onSubmit(nickname, password, birthday, name,city, mobile, userEmail, yearAllowance );
  };
  return (
    <div>
      <div className="join-form">
        <h3> 회원가입 </h3>
        <form onSubmit={handleLoginCheck}>
          <p>
            nickname(닉네임):&nbsp;
            <input type="text" name="nickname" required />&nbsp;
          </p>
          <p>
            Password(비밀번호):&nbsp;
            <input type="password" name="password" required />&nbsp;
          </p>
          <p>
            name(이름):&nbsp;
            <input type="text" name="name" required />&nbsp;
          </p>
          
          <p>
            birthday(생년월일):&nbsp;
            <input type="text" name="birthday" required />&nbsp;
          </p>
          <p>
            city(도시):&nbsp;
            <input type="text" name="city" required />&nbsp;
          </p>
          <p>
            mobile(휴대폰):&nbsp;
            <input type="text" name="mobile" />&nbsp;
          </p>
          <p>
            Email(이메일):&nbsp;
            <input type="text" name="userEmail" />&nbsp;
          </p>
          <p>
            <span style={{ color: "red", fontWeight: "bold" }}>
              YearAllowance(연 용돈):
            </span>&nbsp;&nbsp;
            <input type="number" name="yearAllowance" required />&nbsp;
          </p>
          <button type="submit">가입하기</button>&nbsp;
          
        </form>
      </div>
    </div>
  );
};

export default JoinForm;
