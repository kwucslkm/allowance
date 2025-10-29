import React from 'react';
import styled from 'styled-components';
import { colors, typography, spacing, breakpoints } from '../../styles/tokens';

const HeaderContainer = styled.header`
  background: ${colors.background.primary};
  border-bottom: 1px solid ${colors.border.light};
  padding: ${spacing.lg} 0;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: ${breakpoints.tablet}) {
    padding: 0 ${spacing.lg};
  }
`;

const Logo = styled.h1`
  margin: 0;
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.primary.main};
  letter-spacing: -0.5px;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${typography.fontSize['2xl']};
  }
`;

const LogoIcon = styled.span`
  display: inline-block;
  margin-right: ${spacing.sm};
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <LogoIcon>💰</LogoIcon>
          Allowance System
        </Logo>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
