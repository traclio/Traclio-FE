import { useState } from 'react';
import styled from '@emotion/styled';

const COLORS = {
  primary50: '#e9efff',
  primary100: '#bbcdff',
  secondary50: '#f7f9fa',
  secondary150: '#cfd9e0',
  secondary200: '#aec1cc',
  secondary300: '#5a657c',
};

const PROJECT_COLORS = ['#3B5BFF', '#FF6B3B', '#10B981', '#F59E0B', '#8B5CF6'];

interface Project {
  id: number;
  name: string;
  color: string;
}

interface ProjectItemProps {
  project: Project;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

const MY_PROJECTS: Project[] = [
  { id: 1, name: 'Traclio', color: PROJECT_COLORS[0] },
  { id: 2, name: 'onetap', color: PROJECT_COLORS[1] },
  { id: 3, name: 'MetaMe', color: PROJECT_COLORS[2] },
  { id: 4, name: '오늘도', color: PROJECT_COLORS[3] },
  { id: 5, name: 'STEP', color: PROJECT_COLORS[4] },
];

const PORTFOLIOS: Project[] = [
  { id: 6, name: 'Traclio', color: PROJECT_COLORS[0] },
  { id: 7, name: 'onetap', color: PROJECT_COLORS[1] },
  { id: 8, name: 'STEP', color: PROJECT_COLORS[4] },
];

// ── Icons ──────────────────────────────────────────────────

function TraclioLogo() {
  return (
    <img src="/logo.png" width={40} height={40} alt="Traclio" style={{ borderRadius: '8px' }} />
  );
}

function ProjectIcon() {
  return <img src="/logo.png" width={32} height={32} alt="" style={{ borderRadius: '7px' }} />;
}

function PortfolioStarIcon() {
  return <img src="/logo.png" width={40} height={40} alt="" style={{ borderRadius: '8px' }} />;
}

// ── Styled Components ──────────────────────────────────────

const NavWrapper = styled.div`
  width: 210px;
  height: 960px;
  background: #fff;
  border-right: 1px solid ${COLORS.secondary150};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
  font-family: 'Pretendard', -apple-system, sans-serif;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
  width: 100%;
`;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 140px;
`;

const LogoText = styled.span`
  font-weight: 600;
  font-size: 30px;
  color: #000;
  line-height: 1.6;
`;

const NavSections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 70px;
  width: 100%;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SectionLabel = styled.p`
  font-weight: 500;
  font-size: 18px;
  color: #000;
  line-height: 1.6;
  margin: 0;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ItemRow = styled.div<{ isSelected: boolean; isHovered: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px 6px 6px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
  width: 100%;
  box-sizing: border-box;
  background: ${({ isSelected, isHovered }) =>
    isSelected ? COLORS.primary50 : isHovered ? COLORS.secondary50 : 'transparent'};
  border: 1px solid
    ${({ isSelected, isHovered }) =>
      isSelected
        ? COLORS.primary100
        : isHovered
        ? COLORS.secondary150
        : 'transparent'};
`;

const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ItemName = styled.span<{ isSelected: boolean }>`
  font-weight: ${({ isSelected }) => (isSelected ? 600 : 500)};
  font-size: 20px;
  color: #000;
  line-height: 1.6;
  white-space: nowrap;
`;

const PortfolioCard = styled.div`
  background: #fff;
  border: 1px solid ${COLORS.secondary200};
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
`;

const PortfolioCardTitle = styled.span`
  font-weight: 600;
  font-size: 18px;
  color: #000;
  line-height: 1.6;
`;

const PortfolioCardDesc = styled.span`
  font-weight: 400;
  font-size: 14px;
  color: ${COLORS.secondary300};
  line-height: 1.6;
`;

// ── Sub-components ─────────────────────────────────────────

function ProjectItem({ project, isSelected, onSelect }: ProjectItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ItemRow
      isSelected={isSelected}
      isHovered={isHovered}
      onClick={() => onSelect(project.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ItemLeft>
        <ProjectIcon />
        <ItemName isSelected={isSelected}>{project.name}</ItemName>
      </ItemLeft>
    </ItemRow>
  );
}

// ── Main Component ─────────────────────────────────────────

export const LeftNav = () => {
  const [selectedId, setSelectedId] = useState(5);

  return (
    <NavWrapper>
      <TopSection>
        <LogoRow>
          <TraclioLogo />
          <LogoText>Traclio</LogoText>
        </LogoRow>

        <NavSections>
          <Section>
            <SectionLabel>나의 프로젝트</SectionLabel>
            <ItemList>
              {MY_PROJECTS.map((p) => (
                <ProjectItem
                  key={p.id}
                  project={p}
                  isSelected={selectedId === p.id}
                  onSelect={setSelectedId}
                />
              ))}
            </ItemList>
          </Section>

          <Section>
            <SectionLabel>생성된 포트폴리오</SectionLabel>
            <ItemList>
              {PORTFOLIOS.map((p) => (
                <ProjectItem
                  key={p.id}
                  project={p}
                  isSelected={selectedId === p.id}
                  onSelect={setSelectedId}
                />
              ))}
            </ItemList>
          </Section>
        </NavSections>
      </TopSection>

      <PortfolioCard>
        <PortfolioStarIcon />
        <div>
          <PortfolioCardTitle>포트폴리오 제작하기</PortfolioCardTitle>
          <PortfolioCardDesc>AI로 포트폴리오를 자동 생성해요</PortfolioCardDesc>
        </div>
      </PortfolioCard>
    </NavWrapper>
  );
};
