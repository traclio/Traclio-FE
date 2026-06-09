import { useState } from 'react';
import styled from '@emotion/styled';
import SettingsIcon from '@/assets/icons/settings.svg?react';
import PortfolioIcon from '@/assets/icons/portfolio.svg?react';
import DeleteIcon from '@/assets/icons/delete.svg?react';

// ─── 타입 & 메뉴 아이템 정의 ──────────────────────────────────────────────────

export type MenuAction = 'delete' | 'settings' | 'make';
export type ContextVariant = 'white' | 'gray';

const MENU_ITEMS: Record<MenuAction, { label: string; Icon: React.FC<React.SVGProps<SVGSVGElement>> }> = {
  settings: { label: '프로젝트 설정하기', Icon: SettingsIcon },
  make: { label: '포트폴리오 생성하기', Icon: PortfolioIcon },
  delete: { label: '프로젝트 삭제하기', Icon: DeleteIcon },
};

// ─── Styled Components ────────────────────────────────────────────────────────

const Row = styled.div<{ $variant: ContextVariant; $hovered: boolean }>`
  width: 160px;
  padding: 4px 12px;
  box-sizing: border-box;
  border-radius: 2px;
  overflow: hidden;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;

  background: ${({ $variant, $hovered }) =>
    $variant === 'gray' || $hovered ? '#e7ebee' : '#ffffff'};

  outline: ${({ $variant, $hovered }) =>
    $variant === 'gray' || $hovered ? '1px solid #cfd9e0' : 'none'};
  outline-offset: -1px;
`;

const RowInner = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
`;

const IconSlot = styled.div`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
`;

const IconInner = styled.div`
  width: 14px;
  height: 14px;
  position: absolute;
  top: 1.5px;
  left: 1.5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.div`
  font-family:
    'Pretendard',
    -apple-system,
    sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #1d1d1d;
  white-space: nowrap;
`;

// ─── ContextItem ──────────────────────────────────────────────────────────────

interface ContextItemProps {
  action: MenuAction;
  variant?: ContextVariant;
  onSelect?: (action: MenuAction) => void;
}

export function ContextItem({ action, variant = 'white', onSelect }: ContextItemProps) {
  const [hovered, setHovered] = useState(false);
  const { label, Icon } = MENU_ITEMS[action];

  return (
    <Row
      role="menuitem"
      tabIndex={0}
      $variant={variant}
      $hovered={hovered}
      onClick={() => onSelect?.(action)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={(e) => e.key === 'Enter' && onSelect?.(action)}
    >
      <RowInner>
        <IconSlot>
          <IconInner>
            <Icon width={14} height={14} />
          </IconInner>
        </IconSlot>
        <Label>{label}</Label>
      </RowInner>
    </Row>
  );
}
