import React from 'react';
import styled from 'styled-components';
import { colors, typography, spacing, breakpoints, shadows, borderRadius } from '../../styles/tokens';
import { Button, Input, Label, FormGroup } from '../../styles/common';

interface LoginFormProps {
  onSubmit: (id: string, password: string) => void;
}

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: ${spacing.lg};
`;

const FormCard = styled.div`
  width: 100%;
  max-width: 420px;
  background: ${colors.background.primary};
  border: 1px solid ${colors.border.light};
  border-radius: ${borderRadius.xl};
  padding: ${spacing['2xl']};
  box-shadow: ${shadows.lg};

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 100%;
    padding: ${spacing.xl};
  }
`;

const FormTitle = styled.h2`
  margin: 0 0 ${spacing.xs} 0;
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text.primary};
  text-align: center;
`;

const FormSubtitle = styled.p`
  margin: 0 0 ${spacing['2xl']} 0;
  font-size: ${typography.fontSize.sm};
  color: ${colors.text.secondary};
  text-align: center;
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto ${spacing.lg} auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${colors.primary.light} 0%, ${colors.primary.main} 100%);
  border-radius: ${borderRadius.full};
  font-size: 28px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
`;

const InputWrapper = styled.div`
  position: relative;
`;

const InputIcon = styled.span`
  position: absolute;
  left: ${spacing.md};
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: ${colors.text.tertiary};
  pointer-events: none;
`;

const StyledInput = styled(Input)`
  padding-left: ${spacing['3xl']};
`;

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const handleLoginCheck = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nickname = formData.get('nickname') as string;
    const password = formData.get('password') as string;
    onSubmit(nickname, password);
  };

  return (
    <FormContainer>
      <FormCard>
        <IconWrapper>🔐</IconWrapper>
        <FormTitle>로그인</FormTitle>
        <FormSubtitle>계정에 로그인하여 용돈을 관리하세요</FormSubtitle>

        <StyledForm onSubmit={handleLoginCheck}>
          <FormGroup>
            <Label htmlFor="nickname">닉네임</Label>
            <InputWrapper>
              <InputIcon>👤</InputIcon>
              <StyledInput
                id="nickname"
                type="text"
                name="nickname"
                placeholder="닉네임을 입력하세요"
                required
                autoComplete="username"
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">비밀번호</Label>
            <InputWrapper>
              <InputIcon>🔒</InputIcon>
              <StyledInput
                id="password"
                type="password"
                name="password"
                placeholder="비밀번호를 입력하세요"
                required
                autoComplete="current-password"
              />
            </InputWrapper>
          </FormGroup>

          <Button type="submit" variant="primary" size="lg" fullWidth>
            로그인
          </Button>
        </StyledForm>
      </FormCard>
    </FormContainer>
  );
};

export default LoginForm;
