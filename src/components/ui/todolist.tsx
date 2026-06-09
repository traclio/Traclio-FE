import { type CSSProperties } from 'react';
import styled from '@emotion/styled';

type TodoVariant = 'todo-Default' | 'todo-Complet';

interface TodoListProps {
  label?: string;
  variant?: TodoVariant;
  onToggle?: () => void;
  style?: CSSProperties;
}

const Wrapper = styled.div<{ clickable: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
  user-select: none;
  outline: none;
`;

const IconSlot = styled.span`
  flex-shrink: 0;
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckIcon = styled.img`
  width: 15px;
  height: 15px;
  object-fit: contain;
`;

const Label = styled.span<{ isCompleted: boolean }>`
  font-family: 'Pretendard', -apple-system, sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.6;
  color: ${({ isCompleted }) => (isCompleted ? '#d9d9d9' : '#000000')};
  text-decoration: ${({ isCompleted }) => (isCompleted ? 'line-through' : 'none')};
  white-space: nowrap;
  transition: color 0.15s;
`;

export function TodoList({
  label = '메인 페이지 프론트 개발 완료하기',
  variant = 'todo-Default',
  onToggle,
  style,
}: TodoListProps) {
  const isCompleted = variant === 'todo-Complet';

  return (
    <Wrapper
      role="checkbox"
      aria-checked={isCompleted}
      tabIndex={0}
      clickable={!!onToggle}
      onClick={onToggle}
      onKeyDown={(e) => e.key === ' ' && onToggle?.()}
      style={style}
    >
      <IconSlot>
        <CheckIcon
          src={isCompleted ? '/checkbox.png' : '/empty-checkbox.png'}
          alt={isCompleted ? 'checked' : 'unchecked'}
        />
      </IconSlot>
      <Label isCompleted={isCompleted}>{label}</Label>
    </Wrapper>
  );
}
