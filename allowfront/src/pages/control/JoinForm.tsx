import React from 'react';
import '../../styles/layout.css';

interface JoinFormProps {
  onSubmit: (id: string, password: string) => void; // 로그인 제출 이벤트
  
}
const JoinForm: React.FC<JoinFormProps> = ({ onSubmit }) => {
  const handleLoginCheck = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userEmail = formData.get('userEmail') as string;
    const password = formData.get('password') as string;
    const mobile = formData.get('mobile') as string;
    const nickname = formData.get('nickname') as string;
    const name = formData.get('name') as string;
    const birthday = formData.get('birthday') as string;
    const city = formData.get('city') as string;
    onSubmit(userEmail, password, mobile, nickname, name, birthday, city);
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
          <p>
          mobile:&nbsp;
            <input type="text" name="mobile" required />&nbsp;
          </p>
          <p>
          nickname:&nbsp;
            <input type="text" name="nickname" required />&nbsp;
          </p>
          <p>
          name:&nbsp;
            <input type="text" name="name" required />&nbsp;
          </p>
          <p>
          birthday:&nbsp;
            <input type="text" name="birthday" required />&nbsp;
          </p>
          <p>
          city:&nbsp;
            <input type="text" name="city" required />&nbsp;
          </p>
          <button type="submit">가입</button>&nbsp;
          
        </form>
      </div>
    </div>
  );
};

export default JoinForm;
