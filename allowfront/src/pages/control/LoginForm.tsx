import React from 'react';
import '../../styles/layout.css';
interface LoginFormProps {
  onSubmit: (id: string, password: string) => void; // 로그인 제출 이벤트
  onCancel: () => void; // 로그인 취소 이벤트
}
const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, onCancel }) => {
  const handleLoginCheck = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userEmail = formData.get('userEmail') as string;
    const password = formData.get('password') as string;
    onSubmit(userEmail, password);
  };
  return (
    <div className="login-form">
      <form onSubmit={handleLoginCheck}>
        ID:&nbsp;
        <input type="text" name="userEmail" required />&nbsp;
        Password:&nbsp;
        <input type="password" name="password" required />&nbsp;
        <button type="submit">로그인</button>&nbsp;
        <button type="button" onClick={onCancel}>취소</button>
      </form>
    </div>
  );
};

export default LoginForm;
