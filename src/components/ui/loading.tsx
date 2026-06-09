import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { StatusCard } from './statusCard';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const SpinnerSection = styled.div`
  padding-bottom: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 4px solid #e0e0e0;
  border-top-color: #1d1d1d;
  animation: ${spin} 0.9s linear infinite;
`;

const StatusText = styled.div`
  color: #000;
  font-size: 18px;
  font-weight: 500;
  font-family: 'Pretendard', sans-serif;
  line-height: 28px;
`;

export const Loading = () => {
  return (
    <StatusCard>
      <SpinnerSection>
        <Spinner />
        <StatusText>저장하는 중 입니다</StatusText>
      </SpinnerSection>
    </StatusCard>
  );
};
