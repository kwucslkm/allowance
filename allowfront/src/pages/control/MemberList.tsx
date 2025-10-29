import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { findMemberAll } from '../../services/api';
import { User } from '../../../ts_ts/types';
import { colors, typography, spacing, breakpoints, shadows, borderRadius } from '../../styles/tokens';
import { Card, Heading, Badge } from '../../styles/common';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing.xl} ${spacing.md};

  @media (min-width: ${breakpoints.tablet}) {
    padding: ${spacing['2xl']} ${spacing.lg};
  }
`;

const HeaderSection = styled.div`
  margin-bottom: ${spacing['2xl']};
`;

const Title = styled(Heading)`
  margin: 0 0 ${spacing.sm} 0;
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: ${typography.fontSize.base};
  color: ${colors.text.secondary};
`;

const StatsCard = styled(Card)`
  margin-bottom: ${spacing['2xl']};
  background: linear-gradient(135deg, ${colors.primary.light} 0%, ${colors.primary.main} 100%);
  color: ${colors.text.inverse};
  border: none;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${spacing.xl};
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatLabel = styled.p`
  margin: 0 0 ${spacing.xs} 0;
  font-size: ${typography.fontSize.sm};
  opacity: 0.9;
`;

const StatValue = styled.h3`
  margin: 0;
  font-size: ${typography.fontSize['3xl']};
  font-weight: ${typography.fontWeight.bold};
`;

const TableCard = styled(Card)`
  padding: 0;
  overflow: hidden;
`;

const TableHeader = styled.div`
  padding: ${spacing.lg};
  background: ${colors.background.secondary};
  border-bottom: 1px solid ${colors.border.light};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${spacing.md};
`;

const TableTitle = styled.h3`
  margin: 0;
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.primary};
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
`;

const Thead = styled.thead`
  background: ${colors.background.secondary};
`;

const Th = styled.th`
  padding: ${spacing.md};
  text-align: left;
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 2px solid ${colors.border.main};
  white-space: nowrap;
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  border-bottom: 1px solid ${colors.border.light};
  transition: background 150ms;

  &:hover {
    background: ${colors.background.secondary};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Td = styled.td`
  padding: ${spacing.md};
  font-size: ${typography.fontSize.sm};
  color: ${colors.text.primary};
  white-space: nowrap;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${spacing['3xl']} ${spacing.lg};
  color: ${colors.text.secondary};
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: ${spacing.md};
`;

const MemberBadge = styled(Badge)`
  font-size: ${typography.fontSize.xs};
`;

const MemberList: React.FC = () => {
  const [members, setMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const findMemberA = async () => {
      try {
        const findMemberList = await findMemberAll();
        const memberList = findMemberList.map((member: User) => {
          return member;
        });
        setMembers(memberList);
      } catch (error) {
        console.error('Error fetching members:', error);
      } finally {
        setLoading(false);
      }
    };
    findMemberA();
  }, []);

  const totalMembers = members.length;
  const totalAllowance = members.reduce((sum, member) => sum + (member.yearAllowance || 0), 0);
  const averageAllowance = totalMembers > 0 ? totalAllowance / totalMembers : 0;

  return (
    <Container>
      <HeaderSection>
        <Title as="h1">
          👥 회원 관리
        </Title>
        <Subtitle>전체 회원 목록 및 용돈 현황을 관리합니다</Subtitle>
      </HeaderSection>

      <StatsCard>
        <StatsGrid>
          <StatItem>
            <StatLabel>총 회원 수</StatLabel>
            <StatValue>{totalMembers}명</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>평균 용돈</StatLabel>
            <StatValue>{Math.round(averageAllowance).toLocaleString()}원</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>총 용돈 합계</StatLabel>
            <StatValue>{totalAllowance.toLocaleString()}원</StatValue>
          </StatItem>
        </StatsGrid>
      </StatsCard>

      <TableCard>
        <TableHeader>
          <TableTitle>📋 회원 목록</TableTitle>
          <MemberBadge variant="info">{totalMembers}명 등록</MemberBadge>
        </TableHeader>

        {loading ? (
          <EmptyState>
            <EmptyIcon>⏳</EmptyIcon>
            <p>회원 정보를 불러오는 중...</p>
          </EmptyState>
        ) : members.length > 0 ? (
          <TableWrapper>
            <Table>
              <Thead>
                <tr>
                  <Th>번호</Th>
                  <Th>가입일</Th>
                  <Th>닉네임</Th>
                  <Th>이름</Th>
                  <Th>생년월일</Th>
                  <Th>도시</Th>
                  <Th>휴대폰</Th>
                  <Th>이메일</Th>
                  <Th style={{ textAlign: 'right' }}>남은 용돈</Th>
                </tr>
              </Thead>
              <Tbody>
                {[...members].reverse().map((member: User, index: number) => (
                  <Tr key={member.id}>
                    <Td>{index + 1}</Td>
                    <Td>{member.createdAt ? new Date(member.createdAt).toLocaleDateString('ko-KR') : '-'}</Td>
                    <Td>
                      <strong>{member.nickname}</strong>
                    </Td>
                    <Td>{member.name}</Td>
                    <Td>{member.birthday || '-'}</Td>
                    <Td>{member.city || '-'}</Td>
                    <Td>{member.mobile || '-'}</Td>
                    <Td>{member.userEmail || '-'}</Td>
                    <Td style={{ textAlign: 'right', fontWeight: typography.fontWeight.semibold }}>
                      {member.yearAllowance ? member.yearAllowance.toLocaleString() : '0'} 원
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableWrapper>
        ) : (
          <EmptyState>
            <EmptyIcon>👥</EmptyIcon>
            <p>등록된 회원이 없습니다.</p>
            <p style={{ fontSize: typography.fontSize.sm, color: colors.text.tertiary }}>
              첫 회원이 가입하면 여기에 표시됩니다.
            </p>
          </EmptyState>
        )}
      </TableCard>
    </Container>
  );
};

export default MemberList;
