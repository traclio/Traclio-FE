import { useState } from 'react';
import styled from '@emotion/styled';
import ModalIcon from '@/assets/icons/invite.svg?react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface InviteTeamModalProps {
  currentUserName?: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: (members: string[]) => void;
}

// ─── Styled Components ────────────────────────────────────────────────────────

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 550px;
  background: #ffffff;
  border-radius: 8px;
  padding: 18px 20px;
  box-sizing: border-box;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  min-height: 0;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;


const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  height: 50px;
  justify-content: center;
`;

const Title = styled.span`
  font-family: 'Pretendard', -apple-system, sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.6;
  color: #1d1d1d;
`;

const Subtitle = styled.span`
  font-family: 'Pretendard', -apple-system, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.6;
  color: #67728a;
`;

const HLine = styled.div`
  width: 100%;
  height: 1px;
  background: #cfd9e0;
  flex-shrink: 0;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  flex: 1;
  min-height: 0;
`;

const SectionLabel = styled.span`
  font-family: 'Pretendard', -apple-system, sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.6;
  color: #000000;
`;

const AddMemberSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputRow = styled.div`
  display: flex;
  gap: 4px;
  align-items: flex-start;
`;

const InputBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 1;
  background: #ffffff;
  border: 1px solid #aec1cc;
  border-radius: 8px;
  padding: 8px 12px;
  box-sizing: border-box;
  box-shadow: inset -0.5px -0.5px 1px 0px rgba(58, 61, 66, 0.2);
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-family: 'Pretendard', -apple-system, sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.6;
  color: #1d1d1d;

  &::placeholder {
    color: #aec1cc;
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 16px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #aec1cc;
  border-radius: 8px;
  box-shadow: inset -0.5px -0.5px 1px 0px rgba(58, 61, 66, 0.2);
  cursor: pointer;
  font-family: 'Pretendard', -apple-system, sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.6;
  color: #1d1d1d;
  white-space: nowrap;
`;

const MemberList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MemberRowWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const MeLabel = styled.span`
  font-family: 'Pretendard', -apple-system, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.6;
  color: #4f7fff;
`;

const MemberName = styled.span`
  font-family: 'Pretendard', -apple-system, sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 1.6;
  color: #1d1d1d;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  align-items: flex-end;
  flex-shrink: 0;
`;

const FooterButtons = styled.div`
  display: flex;
  gap: 30px;
`;

const ActionBtn = styled.button<{ hovered: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 16px;
  background: ${({ hovered }) => (hovered ? '#f7f9fa' : '#ffffff')};
  border: 1px solid #aec1cc;
  border-radius: 8px;
  box-shadow: inset -0.5px -0.5px 1px 0px rgba(58, 61, 66, 0.2);
  cursor: pointer;
  transition: background 0.1s;
  font-family: 'Pretendard', -apple-system, sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.6;
  color: #1d1d1d;
  white-space: nowrap;
`;

// ─── Sub-components ───────────────────────────────────────────────────────────

function MemberRow({ name, isMe = false }: { name: string; isMe?: boolean }) {
  return (
    <MemberRowWrapper>
      {isMe && <MeLabel>나</MeLabel>}
      <MemberName>{name}</MemberName>
    </MemberRowWrapper>
  );
}

function ActionButton({ label, onClick }: { label: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <ActionBtn
      hovered={hovered}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </ActionBtn>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function InviteTeamModal({
  currentUserName = '000',
  onClose,
  onPrev,
  onNext,
}: InviteTeamModalProps) {
  const [email, setEmail] = useState('');
  const [members, setMembers] = useState<string[]>([]);

  const handleAdd = () => {
    const trimmed = email.trim();
    if (!trimmed || members.includes(trimmed)) return;
    setMembers((prev) => [...prev, trimmed]);
    setEmail('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <Backdrop onClick={(e) => e.target === e.currentTarget && onClose()}>
      <Panel>
        <Inner>
          {/* ── Header ── */}
          <Header>
            <HeaderRow>
              <ModalIcon width={45} height={45} style={{ flexShrink: 0 }} />
              <TitleGroup>
                <Title>팀원 초대하기</Title>
                <Subtitle>프로젝트의 팀원을 추가해보세요.</Subtitle>
              </TitleGroup>
            </HeaderRow>
            <HLine />
          </Header>

          {/* ── Body ── */}
          <Body>
            <AddMemberSection>
              <SectionLabel>추가할 멤버</SectionLabel>
              <InputRow>
                <InputBox>
                  <StyledInput
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="이메일을 입력하세요"
                  />
                </InputBox>
                <AddButton onClick={handleAdd}>추가</AddButton>
              </InputRow>
            </AddMemberSection>

            <div>
              <SectionLabel>현재 멤버</SectionLabel>
            </div>

            <MemberList>
              <MemberRow name={currentUserName} isMe />
              {members.map((m) => (
                <MemberRow key={m} name={m} />
              ))}
            </MemberList>
          </Body>

          {/* ── Footer ── */}
          <Footer>
            <HLine />
            <FooterButtons>
              <ActionButton label="이전" onClick={onPrev} />
              <ActionButton label="다음" onClick={() => onNext(members)} />
            </FooterButtons>
          </Footer>
        </Inner>
      </Panel>
    </Backdrop>
  );
}
