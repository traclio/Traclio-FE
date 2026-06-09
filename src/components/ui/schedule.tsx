import { type CSSProperties } from 'react';
import styled from '@emotion/styled';

type ScheduleVariant = 'schedule-day' | 'schedule-days';

interface ScheduleProps {
  variant: ScheduleVariant;
  startDate: string;
  endDate?: string;
  title: string;
  style?: CSSProperties;
}

const Card = styled.div`
  align-self: stretch;
  padding: 8px 12px;
  background: #ffffff;
  border-radius: 8px;
  outline: 1px solid #aec1cc;
  outline-offset: -1px;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  box-sizing: border-box;
`;

const Row = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
`;

const DateGroup = styled.div`
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
`;

const DateText = styled.span`
  font-family: 'Pretendard', -apple-system, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #67728a;
`;

const Dot = styled.div`
  width: 2px;
  height: 2px;
  background: #5a657c;
  border-radius: 50%;
`;

const TitleText = styled.span`
  font-family: 'Pretendard', -apple-system, sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  color: #000000;
`;

export function Schedule({ variant, startDate, endDate, title, style }: ScheduleProps) {
  return (
    <Card style={style}>
      <Row>
        <DateGroup>
          <DateText>{startDate}</DateText>
          {variant === 'schedule-days' && endDate && (
            <>
              <Dot />
              <DateText>{endDate}</DateText>
            </>
          )}
        </DateGroup>
        <TitleText>{title}</TitleText>
      </Row>
    </Card>
  );
}
