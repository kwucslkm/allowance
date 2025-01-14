import React from 'react';
import '../../styles/layout.css';

interface LoginFormProps {
  onSubmit: (id: string, password: string) => void; // 로그인 제출 이벤트
  
}
const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const handleLoginCheck = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userEmail = formData.get('userEmail') as string;
    const password = formData.get('password') as string;
    onSubmit(userEmail, password);
  };
  return (
    <div>
      <div className="login-form">
        <form onSubmit={handleLoginCheck}>
          <p>
            ID:&nbsp;
            <input type="text" name="userEmail" required />&nbsp;
          </p>
          <p>
            Password:&nbsp;
            <input type="password" name="password" required />&nbsp;
          </p>
          <button type="submit">로그인</button>&nbsp;
          
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
