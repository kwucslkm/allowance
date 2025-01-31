import React from 'react';
import '../../styles/layout.css';

interface LoginFormProps {
  onSubmit: (id: string, password: string) => void; // 로그인 제출 이벤트
  
}
const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const handleLoginCheck = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // const userEmail = formData.get('userEmail') as string;
    const nickname = formData.get('nickname') as string;
    const password = formData.get('password') as string;
    onSubmit(nickname, password);
  };
  return (
    <div>
      <div className="login-form">
      <h3> 로그인 </h3>
        <form onSubmit={handleLoginCheck}>
          <p>
            닉네임(nickname):&nbsp;
            <input type="text" name="nickname" required placeholder='아이디 입력'/>&nbsp;
          </p>
          <p>
            비밀번호(Password):&nbsp;
            <input type="password" name="password" required placeholder='비밀번호 입력'/>&nbsp;
          </p>
          <button type="submit">로그인</button>&nbsp;
          
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
