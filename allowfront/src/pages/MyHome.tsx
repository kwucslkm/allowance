import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Allow } from '../../ts_ts/types';
import { createAllowance, fetchAllowances, updateAllowance } from '../services/api';
import { colors, typography, spacing, breakpoints, shadows, borderRadius } from '../styles/tokens';
import { Button, Input, Label, FormGroup, Card, Heading } from '../styles/common';

interface MyHomeProps {
  reloadPage: boolean;
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing.xl} ${spacing.md};

  @media (min-width: ${breakpoints.tablet}) {
    padding: ${spacing['2xl']} ${spacing.lg};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.lg};
  margin-bottom: ${spacing['2xl']};

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StatCard = styled(Card)`
  text-align: center;
  padding: ${spacing.xl};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ color }: { color: string }) => color};
  }
`;

const StatIcon = styled.div`
  font-size: 32px;
  margin-bottom: ${spacing.md};
`;

const StatLabel = styled.p`
  margin: 0 0 ${spacing.xs} 0;
  font-size: ${typography.fontSize.sm};
  color: ${colors.text.secondary};
  font-weight: ${typography.fontWeight.medium};
`;

const StatValue = styled.h3`
  margin: 0;
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text.primary};
`;

const FormCard = styled(Card)`
  margin-bottom: ${spacing['2xl']};
`;

const FormTitle = styled(Heading)`
  margin: 0 0 ${spacing.lg} 0;
  font-size: ${typography.fontSize.xl};
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.md};

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FormGroup2Col = styled(FormGroup)`
  @media (min-width: ${breakpoints.tablet}) {
    grid-column: span 2;
  }
`;

const TableCard = styled(Card)`
  padding: 0;
  overflow: hidden;
`;

const TableHeader = styled.div`
  padding: ${spacing.lg};
  background: ${colors.background.secondary};
  border-bottom: 1px solid ${colors.border.light};
`;

const TableTitle = styled.h3`
  margin: 0;
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.primary};
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
`;

const Thead = styled.thead`
  background: ${colors.background.secondary};
`;

const Th = styled.th`
  padding: ${spacing.md};
  text-align: left;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 2px solid ${colors.border.main};
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  border-bottom: 1px solid ${colors.border.light};
  transition: background ${colors.background.secondary} 150ms;

  &:hover {
    background: ${colors.background.secondary};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Td = styled.td`
  padding: ${spacing.md};
  font-size: ${typography.fontSize.base};
  color: ${colors.text.primary};
`;

const TotalRow = styled.tr`
  background: ${colors.background.secondary};
  font-weight: ${typography.fontWeight.bold};
  border-top: 2px solid ${colors.border.main};
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

const MyHome: React.FC<MyHomeProps> = ({ reloadPage }) => {
  const [allowances, setAllowances] = useState<Allow[]>([]);
  const [memberId, setMemberId] = useState(0);
  const [oriYearAllow, setOriYearAllow] = useState(0);
  const [remainAllow, setRemainAllow] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = sessionStorage.getItem('memberInfo');
      if (userInfo) {
        try {
          const parsedUserInfo = JSON.parse(userInfo);
          setMemberId(parsedUserInfo.id);
          setOriYearAllow(parsedUserInfo.ori_yearAllowance);
          setRemainAllow(parsedUserInfo.yearAllowance);
        } catch (error) {
          console.error('Error parsing user info from session storage:', error);
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchAllowancesData = async () => {
      if (memberId) {
        try {
          const findAllowancesByMemberId = await fetchAllowances(memberId);
          const findAllow = findAllowancesByMemberId.Allow.map((oneAllowance: Allow) => {
            return oneAllowance;
          });
          setAllowances(findAllow);
        } catch (error) {
          console.error('Error fetching allowances:', error);
        }
      }
    };
    fetchAllowancesData();
  }, [memberId]);

  const handleAdd = async (category: string, desc: string, store: string, amount: number, memberId: number) => {
    const newAllowance = await createAllowance({
      category,
      description: desc,
      store,
      amount,
      memberId,
    });
    setAllowances((prev) => [...prev, newAllowance]);

    const minusAllowResult = await updateAllowance({
      amount,
      remainAllow,
      memberId,
    });

    if (minusAllowResult.success) {
      setRemainAllow(minusAllowResult.newAllow);

      const savedMemberInfo = sessionStorage.getItem('memberInfo');
      if (savedMemberInfo) {
        const memberInfo = JSON.parse(savedMemberInfo);
        memberInfo.yearAllowance = minusAllowResult.newAllow;
        sessionStorage.setItem('memberInfo', JSON.stringify(memberInfo));
      }
    }
  };

  const totalSpent = allowances.reduce((sum, allowance) => sum + allowance.amount, 0);
  const percentageUsed = oriYearAllow > 0 ? ((oriYearAllow - remainAllow) / oriYearAllow) * 100 : 0;

  return (
    <Container>
      <Heading as="h1" style={{ marginBottom: spacing['2xl'], display: 'flex', alignItems: 'center', gap: spacing.sm }}>
        💰 용돈 관리
      </Heading>

      <StatsGrid>
        <StatCard color={colors.primary.main}>
          <StatIcon>🎯</StatIcon>
          <StatLabel>연간 설정 용돈</StatLabel>
          <StatValue>{oriYearAllow.toLocaleString()} 원</StatValue>
        </StatCard>

        <StatCard color={remainAllow > oriYearAllow * 0.3 ? colors.status.success : colors.status.warning}>
          <StatIcon>💵</StatIcon>
          <StatLabel>남은 용돈</StatLabel>
          <StatValue>{remainAllow.toLocaleString()} 원</StatValue>
          <StatLabel style={{ marginTop: spacing.xs, color: colors.text.tertiary }}>
            {percentageUsed.toFixed(1)}% 사용
          </StatLabel>
        </StatCard>

        <StatCard color={colors.status.info}>
          <StatIcon>📊</StatIcon>
          <StatLabel>총 지출 금액</StatLabel>
          <StatValue>{totalSpent.toLocaleString()} 원</StatValue>
        </StatCard>
      </StatsGrid>

      <FormCard>
        <FormTitle as="h2">
          ✍️ 오늘의 지출 입력
        </FormTitle>
        <StyledForm
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const desc = (form.elements.namedItem('description') as HTMLInputElement).value;
            const amount = parseFloat((form.elements.namedItem('amount') as HTMLInputElement).value);
            const category = (form.elements.namedItem('category') as HTMLInputElement).value;
            const store = (form.elements.namedItem('store') as HTMLInputElement).value;
            const memberIdValue = parseFloat((form.elements.namedItem('memberId') as HTMLInputElement).value);
            handleAdd(category, desc, store, amount, memberIdValue);
            form.reset();
          }}
        >
          <FormGroup>
            <Label htmlFor="category">지출 구분</Label>
            <Input id="category" type="text" name="category" placeholder="예: 간식, 교통비, 문화생활" required />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="description">구매 품목</Label>
            <Input id="description" type="text" name="description" placeholder="구매한 물건이나 서비스" required />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="store">지출처</Label>
            <Input id="store" type="text" name="store" placeholder="상점 또는 사용처" required />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="amount">지출 금액</Label>
            <Input id="amount" type="number" name="amount" placeholder="금액 (원)" required min="0" step="100" />
          </FormGroup>

          <input type="hidden" name="memberId" value={memberId} />

          <FormGroup2Col style={{ marginTop: spacing.sm }}>
            <Button type="submit" variant="primary" size="lg" fullWidth>
              💾 지출 입력
            </Button>
          </FormGroup2Col>
        </StyledForm>
      </FormCard>

      <TableCard>
        <TableHeader>
          <TableTitle>📋 지출 내역</TableTitle>
        </TableHeader>
        {allowances.length > 0 ? (
          <TableWrapper>
            <Table>
              <Thead>
                <tr>
                  <Th>번호</Th>
                  <Th>날짜</Th>
                  <Th>구분</Th>
                  <Th>상점</Th>
                  <Th>품목</Th>
                  <Th style={{ textAlign: 'right' }}>금액</Th>
                </tr>
              </Thead>
              <Tbody>
                {[...allowances].reverse().map((allowance: Allow, index: number) => (
                  <Tr key={allowance.id}>
                    <Td>{index + 1}</Td>
                    <Td>{allowance.createdAt ? new Date(allowance.createdAt).toLocaleDateString('ko-KR') : ''}</Td>
                    <Td>{allowance.category}</Td>
                    <Td>{allowance.store}</Td>
                    <Td>{allowance.description}</Td>
                    <Td style={{ textAlign: 'right', fontWeight: typography.fontWeight.semibold }}>
                      {allowance.amount.toLocaleString()} 원
                    </Td>
                  </Tr>
                ))}
                <TotalRow>
                  <Td colSpan={5} style={{ textAlign: 'right' }}>
                    합계 금액:
                  </Td>
                  <Td style={{ textAlign: 'right' }}>{totalSpent.toLocaleString()} 원</Td>
                </TotalRow>
              </Tbody>
            </Table>
          </TableWrapper>
        ) : (
          <EmptyState>
            <EmptyIcon>📭</EmptyIcon>
            <p>아직 등록된 지출 내역이 없습니다.</p>
            <p style={{ fontSize: typography.fontSize.sm, color: colors.text.tertiary }}>
              위 폼에서 첫 지출을 입력해보세요!
            </p>
          </EmptyState>
        )}
      </TableCard>
    </Container>
  );
};

export default MyHome;
