import styled from '@emotion/styled';
import { StatusCard } from '../../ui/statusCard';
import SuccessIcon from '@/assets/icons/success.svg?react';

const ResultSection = styled.div`
  padding-bottom: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
`;

const StatusText = styled.div`
  color: #000;
  font-size: 18px;
  font-weight: 500;
  font-family: 'Pretendard', sans-serif;
  line-height: 28px;
`;

export const Success = () => {
  return (
    <StatusCard>
      <ResultSection>
        <SuccessIcon width={48} height={48} />
        <StatusText>저장 완료</StatusText>
      </ResultSection>
    </StatusCard>
  );
};
