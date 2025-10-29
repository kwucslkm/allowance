import React, { useState } from 'react';
import styled from 'styled-components';
import { colors, typography, spacing, breakpoints, transitions } from '../../styles/tokens';

interface NavProps {
  _managerYn: boolean;
  _loginYn: boolean;
  onMyPageClick(): void;
  onLoginClick(): void;
  onJoinClick(): void;
  onMemberListClick(): void;
  onLogoutClick(): void;
  onHomeClick(): void;
}

const NavContainer = styled.nav`
  background: ${colors.background.primary};
  border-bottom: 1px solid ${colors.border.light};
  padding: ${spacing.md} 0;
`;

const NavContent = styled.div`
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

const NavList = styled.ul<{ isOpen?: boolean }>`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  flex-wrap: wrap;

  @media (max-width: 767px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${colors.background.primary};
    flex-direction: column;
    padding: ${spacing.md};
    border-bottom: 1px solid ${colors.border.light};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    z-index: 50;
  }
`;

const NavSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  flex-wrap: wrap;

  @media (max-width: 767px) {
    width: 100%;
    flex-direction: column;
    gap: ${spacing.xs};
  }
`;

const NavItem = styled.li`
  display: inline-block;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const NavLink = styled.a`
  display: inline-block;
  padding: ${spacing.sm} ${spacing.md};
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.text.primary};
  text-decoration: none;
  border-radius: 6px;
  transition: all ${transitions.fast};
  white-space: nowrap;

  &:hover {
    background: ${colors.background.secondary};
    color: ${colors.primary.main};
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.main};
    outline-offset: 2px;
  }

  @media (max-width: 767px) {
    width: 100%;
    text-align: center;
  }
`;

const UserBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.xs};
  padding: ${spacing.sm} ${spacing.md};
  background: ${colors.background.secondary};
  border-radius: 6px;
  font-size: ${typography.fontSize.sm};
  color: ${colors.text.primary};

  @media (max-width: 767px) {
    width: 100%;
    justify-content: center;
  }
`;

const ManagerBadge = styled.span`
  display: inline-block;
  padding: 2px 6px;
  background: ${colors.primary.main};
  color: ${colors.text.inverse};
  border-radius: 4px;
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.semibold};
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  padding: ${spacing.sm};
  cursor: pointer;
  color: ${colors.text.primary};

  @media (max-width: 767px) {
    display: block;
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.main};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

const HamburgerIcon = styled.div`
  width: 24px;
  height: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  span {
    display: block;
    height: 2px;
    background: currentColor;
    border-radius: 2px;
    transition: all ${transitions.fast};
  }

  ${({ isOpen }: { isOpen: boolean }) =>
    isOpen &&
    `
    span:nth-child(1) {
      transform: translateY(9px) rotate(45deg);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: translateY(-9px) rotate(-45deg);
    }
  `}
`;

const DesktopNav = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xl};
  width: 100%;

  @media (max-width: 767px) {
    position: relative;
  }
`;

const LeftSection = styled(NavSection)`
  @media (min-width: 768px) {
    flex: 1;
  }
`;

const RightSection = styled(NavSection)`
  @media (min-width: 768px) {
    justify-content: flex-end;
  }
`;

const Nav: React.FC<NavProps> = ({
  _managerYn,
  _loginYn,
  onMyPageClick,
  onHomeClick,
  onMemberListClick,
  onLoginClick,
  onJoinClick,
  onLogoutClick,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const memberInfo = sessionStorage.getItem('memberInfo');
  const nickname: string = memberInfo ? JSON.parse(memberInfo).nickname : null;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = (callback: () => void) => {
    return (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      callback();
      setIsMobileMenuOpen(false);
    };
  };

  return (
    <NavContainer>
      <NavContent>
        <DesktopNav>
          <MobileMenuButton
            onClick={toggleMobileMenu}
            aria-label="메뉴 토글"
            aria-expanded={isMobileMenuOpen}
          >
            <HamburgerIcon isOpen={isMobileMenuOpen}>
              <span />
              <span />
              <span />
            </HamburgerIcon>
          </MobileMenuButton>

          <NavList isOpen={isMobileMenuOpen}>
            <LeftSection>
              <NavItem>
                <NavLink href="/" onClick={handleLinkClick(onHomeClick)}>
                  🏠 홈
                </NavLink>
              </NavItem>
              {_managerYn && (
                <NavItem>
                  <NavLink href="/list" onClick={handleLinkClick(onMemberListClick)}>
                    👥 회원목록
                  </NavLink>
                </NavItem>
              )}
            </LeftSection>

            <RightSection>
              {!_loginYn && (
                <>
                  <NavItem>
                    <NavLink href="/join" onClick={handleLinkClick(onJoinClick)}>
                      ✨ 회원가입
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/login" onClick={handleLinkClick(onLoginClick)}>
                      🔐 로그인
                    </NavLink>
                  </NavItem>
                </>
              )}
              {_loginYn && (
                <>
                  <NavItem>
                    <UserBadge>
                      {_managerYn && <ManagerBadge>관리자</ManagerBadge>}
                      {nickname}님
                    </UserBadge>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/logout" onClick={handleLinkClick(onLogoutClick)}>
                      🚪 로그아웃
                    </NavLink>
                  </NavItem>
                </>
              )}
            </RightSection>
          </NavList>
        </DesktopNav>
      </NavContent>
    </NavContainer>
  );
};

export default Nav;
