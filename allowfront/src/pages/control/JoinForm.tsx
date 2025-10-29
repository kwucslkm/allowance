import React from 'react';
import styled from 'styled-components';
import { colors, typography, spacing, breakpoints, shadows, borderRadius } from '../../styles/tokens';
import { Button, Input, Label, FormGroup } from '../../styles/common';

interface JoinFormProps {
  onSubmit: (
    nickname: string,
    password: string,
    birthday: string,
    name: string,
    city: string,
    mobile: string,
    userEmail: string,
    ori_yearAllowance: number,
    yearAllowance: number
  ) => void;
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
  max-width: 520px;
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
  gap: ${spacing.md};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.md};

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const HighlightedFormGroup = styled(FormGroup)`
  background: ${colors.background.secondary};
  border: 2px dashed ${colors.primary.main};
  border-radius: ${borderRadius.md};
  padding: ${spacing.md};
`;

const HighlightLabel = styled(Label)`
  color: ${colors.primary.main};
  font-weight: ${typography.fontWeight.semibold};
`;

const HelpText = styled.p`
  margin: ${spacing.xs} 0 0 0;
  font-size: ${typography.fontSize.xs};
  color: ${colors.text.tertiary};
`;

const JoinForm: React.FC<JoinFormProps> = ({ onSubmit }) => {
  const handleJoinSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    const ori_yearAllowance = value ? Number(value as string) : 0;
    const yearAllowance = ori_yearAllowance;

    onSubmit(nickname, password, birthday, name, city, mobile, userEmail, ori_yearAllowance, yearAllowance);
  };

  return (
    <FormContainer>
      <FormCard>
        <IconWrapper>✨</IconWrapper>
        <FormTitle>회원가입</FormTitle>
        <FormSubtitle>새 계정을 만들어 용돈 관리를 시작하세요</FormSubtitle>

        <StyledForm onSubmit={handleJoinSubmit}>
          <FormRow>
            <FormGroup>
              <Label htmlFor="nickname">닉네임 *</Label>
              <Input
                id="nickname"
                type="text"
                name="nickname"
                placeholder="닉네임"
                required
                autoComplete="username"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">비밀번호 *</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="비밀번호"
                required
                autoComplete="new-password"
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label htmlFor="name">이름 *</Label>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="이름"
                required
                autoComplete="name"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="birthday">생년월일 *</Label>
              <Input
                id="birthday"
                type="date"
                name="birthday"
                required
                autoComplete="bday"
              />
              <HelpText>YYYY-MM-DD 형식</HelpText>
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label htmlFor="city">도시 *</Label>
              <Input
                id="city"
                type="text"
                name="city"
                placeholder="거주 도시"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="mobile">휴대폰</Label>
              <Input
                id="mobile"
                type="tel"
                name="mobile"
                placeholder="010-1234-5678"
                autoComplete="tel"
              />
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label htmlFor="userEmail">이메일</Label>
            <Input
              id="userEmail"
              type="email"
              name="userEmail"
              placeholder="email@example.com"
              autoComplete="email"
            />
          </FormGroup>

          <HighlightedFormGroup>
            <HighlightLabel htmlFor="yearAllowance">💰 연간 용돈 *</HighlightLabel>
            <Input
              id="yearAllowance"
              type="number"
              name="yearAllowance"
              placeholder="예: 1000000"
              required
              min="0"
              step="10000"
            />
            <HelpText>1년 동안 사용할 총 용돈을 입력하세요</HelpText>
          </HighlightedFormGroup>

          <Button type="submit" variant="primary" size="lg" fullWidth>
            가입하기
          </Button>
        </StyledForm>
      </FormCard>
    </FormContainer>
  );
};

export default JoinForm;
