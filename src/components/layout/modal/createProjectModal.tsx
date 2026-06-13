import { useState } from 'react';
import styled from '@emotion/styled';
import ModalIcon from '@/assets/icons/setting.svg?react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CreateProjectModalProps {
  onClose: () => void;
  onNext: (data: { name: string; logoFile: File | null; githubUrl: string }) => void;
}

// ─── Shared ───────────────────────────────────────────────────────────────────

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
  flex-shrink: 0;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 50px;
`;

const IconCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background: #ffffff;
  border: 1px solid #e7ebee;
  border-radius: 50%;
  flex-shrink: 0;
  padding: 8px;
  box-sizing: border-box;
`;


const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
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
  padding-top: 40px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FieldLabel = styled.span`
  font-family: 'Pretendard', -apple-system, sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.6;
  color: #000000;
`;

const InputBox = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
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

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FileButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 16px;
  background: #ffffff;
  border: 1px solid #aec1cc;
  border-radius: 8px;
  box-shadow: inset -0.5px -0.5px 1px 0px rgba(58, 61, 66, 0.2);
  cursor: pointer;

  span {
    font-family: 'Pretendard', -apple-system, sans-serif;
    font-weight: 500;
    font-size: 18px;
    line-height: 1.6;
    color: #1d1d1d;
    white-space: nowrap;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-shrink: 0;
`;

const FooterButtons = styled.div`
  display: flex;
  justify-content: flex-end;
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

  span {
    font-family: 'Pretendard', -apple-system, sans-serif;
    font-weight: 500;
    font-size: 18px;
    line-height: 1.6;
    color: #1d1d1d;
    white-space: nowrap;
  }
`;

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldInput({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <InputBox>
      <StyledInput
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </InputBox>
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
      <span>{label}</span>
    </ActionBtn>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function CreateProjectModal({ onClose, onNext }: CreateProjectModalProps) {
  const [name, setName] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [githubUrl, setGithubUrl] = useState('');

  const handleNext = () => onNext({ name, logoFile, githubUrl });

  return (
    <Backdrop onClick={(e) => e.target === e.currentTarget && onClose()}>
      <Panel>
        <Inner>
          {/* ── Header ── */}
          <Header>
            <HeaderRow>
              <IconCircle>
                <ModalIcon width={24} height={24} />
              </IconCircle>
              <TitleGroup>
                <Title>프로젝트 생성</Title>
                <Subtitle>프로젝트의 초기 설정을 해주세요</Subtitle>
              </TitleGroup>
            </HeaderRow>
            <HLine />
          </Header>

          {/* ── Body ── */}
          <Body>
            <FieldGroup>
              <FieldLabel>프로젝트 이름</FieldLabel>
              <FieldInput placeholder="이름을 입력하세요" value={name} onChange={setName} />
            </FieldGroup>

            <LogoRow>
              <FieldLabel>로고 넣기</FieldLabel>
              <label style={{ cursor: 'pointer' }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
                  style={{ display: 'none' }}
                />
                <FileButton>
                  <span>{logoFile ? logoFile.name : '이미지'}</span>
                </FileButton>
              </label>
            </LogoRow>

            <FieldGroup>
              <FieldLabel>깃허브 링크</FieldLabel>
              <FieldInput
                placeholder="링크를 입력하세요"
                value={githubUrl}
                onChange={setGithubUrl}
              />
            </FieldGroup>
          </Body>

          {/* ── Footer ── */}
          <Footer>
            <HLine />
            <FooterButtons>
              <ActionButton label="취소" onClick={onClose} />
              <ActionButton label="다음" onClick={handleNext} />
            </FooterButtons>
          </Footer>
        </Inner>
      </Panel>
    </Backdrop>
  );
}
