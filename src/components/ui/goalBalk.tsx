import styled from '@emotion/styled';

interface GoalBackItemProps {
  month: string;
  day: string | number;
  label: string;
  title: string;
  isActive?: boolean;
}

const Card = styled.div<{ isActive: boolean }>`
  width: 384px;
  height: 96px;
  padding: 20px;
  border-radius: 12px;
  outline: 1px solid ${({ isActive }) => (isActive ? '#9ab5ff' : '#cfd9e0')};
  outline-offset: -1px;
  background-color: ${({ isActive }) => (isActive ? '#e9efff' : '#ffffff')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
`;

const Row = styled.div`
  width: 320px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
`;

const DateSection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const DateColumn = styled.div`
  width: 36px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const MonthText = styled.span`
  align-self: stretch;
  color: #67728a;
  font-size: 14px;
  font-weight: 400;
  text-transform: capitalize;
  line-height: 24px;
  font-family: 'Pretendard', sans-serif;
`;

const DayText = styled.span`
  color: #000;
  font-size: 20px;
  font-weight: 600;
  text-transform: capitalize;
  line-height: 32px;
  font-family: 'Pretendard', sans-serif;
`;

const Divider = styled.div`
  width: 0;
  align-self: stretch;
  outline: 1px solid #cfd9e0;
  outline-offset: -0.5px;
`;

const InfoSection = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const LabelText = styled.span`
  align-self: stretch;
  color: #67728a;
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
  line-height: 24px;
  font-family: 'Pretendard', sans-serif;
`;

const TitleText = styled.span`
  align-self: stretch;
  color: #1d1d1d;
  font-size: 18px;
  font-weight: 400;
  text-transform: capitalize;
  line-height: 28px;
  font-family: 'Pretendard', sans-serif;
`;

export const GoalBackItem = ({ month, day, label, title, isActive = false }: GoalBackItemProps) => {
  return (
    <Card isActive={isActive}>
      <Row>
        <DateSection>
          <DateColumn>
            <MonthText>{month}</MonthText>
            <DayText>{day}</DayText>
          </DateColumn>
          <Divider />
        </DateSection>
        <InfoSection>
          <LabelText>{label}</LabelText>
          <TitleText>{title}</TitleText>
        </InfoSection>
      </Row>
    </Card>
  );
};
