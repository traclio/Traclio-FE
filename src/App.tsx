import { useState } from 'react';
import { GoalBackItem } from './components/ui/goalBalk';
import { CalendarListItem } from './components/ui/calendarList';
import { TimelineItem } from './components/ui/timeLine';
import { Calendar } from './components/ui/calendar';
import { Loading } from './components/ui/loading';
import { LeftNav } from './components/constants/leftNav';
import { Success } from './components/layout/modal/success';
import { Fail } from './components/layout/modal/fail';
import { ContextItem } from './components/ui/contextBlack';
import { TodoList } from './components/ui/todoList';
import { CreateProjectModal } from './components/layout/modal/createProjectModal';
import { InviteTeamModal } from './components/layout/modal/inviteTeamModal';
import { RegisterScheduleModal } from './components/layout/modal/registerScheduleModal';

function App() {
  const [step, setStep] = useState<null | 'create' | 'invite' | 'schedule'>(null);

  return (
    <div style={{ display: 'flex' }}>
      <LeftNav />
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <button onClick={() => setStep('create')}>모달 열기</button>
        <TimelineItem date="2026.03.29" title="내가 짱이다" tag="ONETAP" username="이시은아님" />
        <TimelineItem date="2026.03.29" title="내가 짱이다" tag="ONETAP" />
        <CalendarListItem time="9:00" period="AM" label="ONETAP" isActive />
        <CalendarListItem time="9:00" period="AM" label="ONETAP" />
        <GoalBackItem month="26.03" day="23" label="ONETAP" title="햄부기햄북쓰딱쓰" isActive />
        <Calendar initialYear={2026} initialMonth={4} selectedDate={19} />
        <Loading />
        <Success />
        <Fail />
        <ContextItem action="settings" variant="white" />
        <ContextItem action="make" variant="white" />
        <ContextItem action="delete" variant="white" />
        <ContextItem action="settings" variant="gray" />
        <ContextItem action="make" variant="gray" />
        <ContextItem action="delete" variant="gray" />
        <TodoList label="메인 페이지 프론트 개발 완료하기" variant="todo-Default" />
        <TodoList label="완료된 항목 예시" variant="todo-Complet" />
      </div>

      {step === 'create' && (
        <CreateProjectModal onClose={() => setStep(null)} onNext={() => setStep('invite')} />
      )}

      {step === 'schedule' && (
        <RegisterScheduleModal onClose={() => setStep(null)} onCreate={() => setStep(null)} />
      )}

      {step === 'invite' && (
        <InviteTeamModal
          currentUserName="이시은"
          onClose={() => setStep(null)}
          onPrev={() => setStep('create')}
          onNext={() => setStep('schedule')}
        />
      )}
    </div>
  );
}

export default App;
