import { useState } from 'react';
import styled from '@emotion/styled';
import ModalIcon from '@/assets/icons/schedule.svg?react';
import { Calendar } from '@/components/ui/calendar';
import { Schedule } from '@/components/ui/schedule';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ScheduleItem {
  id: number;
  name: string;
  startDate: string;
  endDate?: string;
}

interface RegisterScheduleModalProps {
  onClose: () => void;
  onCreate: (schedules: ScheduleItem[]) => void;
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

const VLine = styled.div`
  width: 1px;
  align-self: stretch;
  background: #cfd9e0;
  flex-shrink: 0;
`;

const Body = styled.div`
  display: flex;
  gap: 30px;
  align-items: flex-start;
  width: 100%;
`;

const LeftPane = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

const RangeHint = styled.p`
  font-family: 'Pretendard', -apple-system, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.6;
  color: #67728a;
  text-align: center;
  margin: 0;
`;

const RightPane = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
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

const InlineButtons = styled.div`
  display: flex;
  gap: 30px;
  justify-content: flex-end;
`;

const ScheduleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 148px;
  overflow-y: auto;
`;


const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  align-items: flex-end;
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

function fmt(d: Date) {
  return `${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function RegisterScheduleModal({ onClose, onCreate }: RegisterScheduleModalProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [scheduleName, setScheduleName] = useState('');
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);

  const handleDateSelect = (year: number, month: number, day: number) => {
    setViewYear(year);
    setViewMonth(month);
    const date = new Date(year, month, day);
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(date);
      setRangeEnd(null);
    } else {
      if (date >= rangeStart) {
        setRangeEnd(date);
      } else {
        setRangeStart(date);
        setRangeEnd(null);
      }
    }
  };

  const handleRegister = () => {
    const trimmed = scheduleName.trim();
    if (!trimmed) return;
    const start = rangeStart ?? new Date();
    setSchedules((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: trimmed,
        startDate: fmt(start),
        endDate: rangeEnd ? fmt(rangeEnd) : undefined,
      },
    ]);
    setScheduleName('');
    setRangeStart(null);
    setRangeEnd(null);
  };

  const handleClearForm = () => {
    setScheduleName('');
    setRangeStart(null);
    setRangeEnd(null);
  };

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
                <Title>일정 등록하기</Title>
                <Subtitle>일정을 등록해주세요</Subtitle>
              </TitleGroup>
            </HeaderRow>
            <HLine />
          </Header>

          {/* ── Body ── */}
          <Body>
            <LeftPane>
              <Calendar
                initialYear={viewYear}
                initialMonth={viewMonth}
                selectedDate={rangeEnd?.getDate() ?? rangeStart?.getDate()}
                onDateSelect={handleDateSelect}
              />
              {rangeStart && (
                <RangeHint>
                  {rangeEnd
                    ? `${fmt(rangeStart)} ~ ${fmt(rangeEnd)}`
                    : `${fmt(rangeStart)} 선택됨 — 종료일을 선택하세요`}
                </RangeHint>
              )}
            </LeftPane>

            <VLine />

            <RightPane>
              <FieldGroup>
                <FieldLabel>일정 이름</FieldLabel>
                <InputBox>
                  <StyledInput
                    type="text"
                    value={scheduleName}
                    onChange={(e) => setScheduleName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
                    placeholder="이름을 입력하세요..."
                  />
                </InputBox>
              </FieldGroup>

              <InlineButtons>
                <ActionButton label="취소" onClick={handleClearForm} />
                <ActionButton label="등록하기" onClick={handleRegister} />
              </InlineButtons>

              <HLine />

              <FieldGroup>
                <FieldLabel>추가된 일정</FieldLabel>
                <ScheduleList>
                  {schedules.map((s) => (
                    <Schedule
                      key={s.id}
                      variant={s.endDate ? 'schedule-days' : 'schedule-day'}
                      startDate={s.startDate}
                      endDate={s.endDate}
                      title={s.name}
                      style={{ width: '100%' }}
                    />
                  ))}
                </ScheduleList>
              </FieldGroup>
            </RightPane>
          </Body>

          {/* ── Footer ── */}
          <Footer>
            <HLine />
            <FooterButtons>
              <ActionButton label="취소" onClick={onClose} />
              <ActionButton label="생성하기" onClick={() => onCreate(schedules)} />
            </FooterButtons>
          </Footer>
        </Inner>
      </Panel>
    </Backdrop>
  );
}
