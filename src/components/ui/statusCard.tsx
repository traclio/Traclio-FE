import { type ReactNode } from 'react';
import styled from '@emotion/styled';

const Card = styled.div`
  width: 842px;
  padding: 28px 40px;
  background-color: #fff;
  border-radius: 8px;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
`;

const Inner = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 32px;
`;

const LogoSection = styled.div`
  width: 760px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const LogoRow = styled.div`
  align-self: stretch;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const LogoIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  object-fit: contain;
`;

const LogoText = styled.div`
  color: #000;
  font-size: 20px;
  font-weight: 700;
  font-family: 'Pretendard', sans-serif;
  text-transform: capitalize;
  line-height: 32px;
`;

const Divider = styled.div`
  width: 760px;
  height: 0;
  outline: 1px solid #cfd9e0;
  outline-offset: -0.5px;
`;

interface StatusCardProps {
  children: ReactNode;
}

export const StatusCard = ({ children }: StatusCardProps) => {
  return (
    <Card>
      <Inner>
        <LogoSection>
          <LogoRow>
            <LogoIcon src="/logo.png" alt="logo" />
            <LogoText>Onetap</LogoText>
          </LogoRow>
          <Divider />
        </LogoSection>
        {children}
      </Inner>
    </Card>
  );
};
