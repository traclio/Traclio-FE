import styled from '@emotion/styled';

interface TimelineItemProps {
  date: string;
  title: string;
  tag: string;
  username?: string;
}

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const LineColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DotOuter = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #2056e8;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

const DotInner = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #2056e8;
`;

const VerticalLine = styled.div`
  width: 2px;
  height: 112px;
  background-color: #2056e8;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DateText = styled.span`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.6;
  color: #67728a;
  font-family: 'Pretendard', sans-serif;
`;

const UsernameText = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.6;
  color: #aec1cc;
  font-family: 'Pretendard', sans-serif;
`;

const Card = styled.div`
  width: 320px;
  padding: 12px;
  background-color: #fff;
  border-radius: 8px;
  outline: 1px solid #cfd9e0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TitleText = styled.span`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.6;
  color: #1d1d1d;
  font-family: 'Pretendard', sans-serif;
`;

const TagRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TagDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #2056e8;
`;

const TagText = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #000;
  font-family: 'Pretendard', sans-serif;
`;

export const TimelineItem = ({ date, title, tag, username }: TimelineItemProps) => {
  return (
    <Wrapper>
      <LineColumn>
        <DotOuter>
          <DotInner />
        </DotOuter>
        <VerticalLine />
      </LineColumn>
      <Content>
        <MetaRow>
          <DateText>{date}</DateText>
          {username && <UsernameText>{username}</UsernameText>}
        </MetaRow>
        <Card>
          <TitleText>{title}</TitleText>
          <TagRow>
            <TagDot />
            <TagText>{tag}</TagText>
          </TagRow>
        </Card>
      </Content>
    </Wrapper>
  );
};
