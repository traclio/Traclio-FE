import styled from '@emotion/styled';

interface CalendarListItemProps {
  time: string;
  period: 'AM' | 'PM';
  label: string;
  isActive?: boolean;
}

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const DotColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ActiveDot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #235fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ActiveDotInner = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #235fff;
`;

const InactiveDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #67728a;
  margin-top: 4px;
`;

const Line = styled.div`
  width: 0;
  height: 48px;
  border-left: 2px solid #5a657c;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const TimeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TimeText = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: #000;
  text-transform: capitalize;
  line-height: 28px;
  font-family: 'Pretendard', sans-serif;
`;

const LabelText = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #67728a;
  text-transform: capitalize;
  line-height: 24px;
  font-family: 'Pretendard', sans-serif;
`;

export const CalendarListItem = ({
  time,
  period,
  label,
  isActive = false,
}: CalendarListItemProps) => {
  return (
    <Wrapper>
      <DotColumn>
        {isActive ? (
          <ActiveDot>
            <ActiveDotInner />
          </ActiveDot>
        ) : (
          <InactiveDot />
        )}
        <Line />
      </DotColumn>
      <Content>
        <TimeRow>
          <TimeText>{time}</TimeText>
          <TimeText>{period}</TimeText>
        </TimeRow>
        <LabelText>{label}</LabelText>
      </Content>
    </Wrapper>
  );
};
