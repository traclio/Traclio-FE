import { useState } from 'react';
import styled from '@emotion/styled';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CalendarProps {
  initialYear?: number;
  initialMonth?: number;
  selectedDate?: number;
  onDateSelect?: (year: number, month: number, day: number) => void;
}

const Container = styled.div`
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: inset -0.5px -0.5px 1px 0px rgba(58, 61, 66, 0.2);
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Inner = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const Header = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 2px;
`;

const YearText = styled.span`
  align-self: stretch;
  height: 20px;
  text-align: center;
  color: #1d1d1d;
  font-size: 14px;
  font-weight: 400;
  font-family: 'Pretendard', sans-serif;
  text-transform: capitalize;
  line-height: 24px;
`;

const NavRow = styled.div`
  align-self: stretch;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
`;

const NavButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  color: #1d1d1d;
  font-size: 18px;
  line-height: 1;
  background: none;
  border: none;
  cursor: pointer;
`;

const MonthText = styled.span`
  color: #1d1d1d;
  font-size: 18px;
  font-weight: 500;
  font-family: 'Pretendard', sans-serif;
  text-transform: capitalize;
  line-height: 28px;
`;

const Grid = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const GridInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
`;

const DayHeaderRow = styled.div`
  align-self: stretch;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
`;

const DayHeaderCell = styled.div`
  width: 36px;
  padding: 5px 14px;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  overflow: hidden;
`;

const DayHeaderText = styled.span`
  color: #1d1d1d;
  font-size: 18px;
  font-weight: 400;
  font-family: 'Pretendard', sans-serif;
  text-transform: capitalize;
  line-height: 28px;
`;

const WeekRow = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
`;

const DayCell = styled.div<{ isSelected: boolean; isToday: boolean; isEmpty: boolean }>`
  width: 40px;
  padding: 5px 14px;
  border-radius: 4px;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  overflow: hidden;
  cursor: ${({ isEmpty }) => (isEmpty ? 'default' : 'pointer')};
  background-color: ${({ isSelected, isToday }) =>
    isSelected ? '#235fff' : isToday ? '#e9efff' : 'transparent'};
  box-shadow: ${({ isSelected }) =>
    isSelected ? 'inset -0.5px -0.5px 1px 0px rgba(58,61,66,0.20)' : 'none'};
`;

const DayText = styled.span<{ isSelected: boolean; isToday: boolean }>`
  font-size: 20px;
  font-weight: 700;
  font-family: 'Pretendard', sans-serif;
  text-transform: capitalize;
  line-height: 32px;
  color: ${({ isSelected, isToday }) => (isSelected ? '#fff' : isToday ? '#67728a' : '#1d1d1d')};
`;

export const Calendar = ({
  initialYear = new Date().getFullYear(),
  initialMonth = new Date().getMonth(),
  selectedDate,
  onDateSelect,
}: CalendarProps) => {
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [selected, setSelected] = useState(selectedDate ?? null);

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const todayDate = isCurrentMonth ? today.getDate() : null;

  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  const handlePrev = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
    setSelected(null);
  };

  const handleNext = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
    setSelected(null);
  };

  const handleSelect = (day: number) => {
    setSelected(day);
    onDateSelect?.(year, month, day);
  };

  return (
    <Container>
      <Inner>
        <Header>
          <YearText>{year}년</YearText>
          <NavRow>
            <NavButton onClick={handlePrev}>{'<'}</NavButton>
            <MonthText>{month + 1}월</MonthText>
            <NavButton onClick={handleNext}>{'>'}</NavButton>
          </NavRow>
        </Header>
        <Grid>
          <GridInner>
            <DayHeaderRow>
              {DAYS.map((d) => (
                <DayHeaderCell key={d}>
                  <DayHeaderText>{d}</DayHeaderText>
                </DayHeaderCell>
              ))}
            </DayHeaderRow>
            {weeks.map((week, wi) => (
              <WeekRow key={wi}>
                {week.map((day, di) => {
                  const isSelected = day !== null && day === selected;
                  const isToday = day !== null && day === todayDate;
                  return (
                    <DayCell
                      key={di}
                      isSelected={isSelected}
                      isToday={isToday}
                      isEmpty={day === null}
                      onClick={() => day !== null && handleSelect(day)}
                    >
                      <DayText isSelected={isSelected} isToday={isToday}>
                        {day ?? ''}
                      </DayText>
                    </DayCell>
                  );
                })}
              </WeekRow>
            ))}
          </GridInner>
        </Grid>
      </Inner>
    </Container>
  );
};
