import React from 'react';
import styled from 'styled-components';
import { colors, typography, spacing, breakpoints } from '../../styles/tokens';

const FooterContainer = styled.footer`
  background: ${colors.background.secondary};
  border-top: 1px solid ${colors.border.light};
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing.lg} ${spacing.md};
  text-align: center;

  @media (min-width: ${breakpoints.tablet}) {
    padding: ${spacing.lg};
  }
`;

const Copyright = styled.p`
  margin: 0;
  font-size: ${typography.fontSize.sm};
  color: ${colors.text.secondary};
  font-family: ${typography.fontFamily.primary};
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>&copy; {currentYear} lkm, Inc. All rights reserved.</Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
