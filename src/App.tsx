import styled from "@emotion/styled"
import { Global, css } from '@emotion/react';

const Header = styled.div`
  text-align: right;
  background-color: red;
  height: 40px;

  padding: 20px 30px;
`;

const Footer = styled.div`
  width: 100%;
  background-color: blue;
  height: 120px;
`;

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  width: 210px;
  background-color: pink;
  padding: 10px;
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #F7F9FA;
`;

const Content = styled.div`
  flex: 1;

  margin: 32px 128px;

  background-color: orange;
`;

const LogoArea = styled.div`
  display: flex;
  align-items: center;
  background-color: blue;

  margin-bottom: 50px;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  background-color: red;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const Card = styled.div`
  background-color: blue;
`;

const RightPanel = styled.div`
  background-color: pink;
  right: 0px;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
`;

const ProjectName = styled.div`
  item-align: left;
  margin-bottom: 20px;
  display: flex;
`;

const ProjectImg = styled.div`
  width: 42px;
  height: 42px;
  background-color: pink;
  margin-right: 12px;
`;

const CardTop = styled.div`
  display: flex;
  gap: 28px;
`;

function App() {

  return (
    <>
      <Global
        styles={css`
          html, body, #root {
            margin: 0;
            padding: 0;
            height: 100%;
          }
        `}
      />
    <Layout>

      <Sidebar>
          <LogoArea>ONETAP</LogoArea>
          <MenuList>List</MenuList>
      </Sidebar>

      <Main>
        <Header>상단</Header>

        <Content>
          <ProjectName>
            <ProjectImg>image</ProjectImg>
            onetap</ProjectName>
          <Row>
            <CardList>
              <CardTop>
                <Card>마감임박</Card>
                <Card>today</Card>
              </CardTop>
              <Card>일정확인</Card>
            </CardList>

            <RightPanel>저장기록</RightPanel>
          </Row>
        </Content>
      </Main>
    </Layout>
    <Footer>하단</Footer>
    </>
  )
}

export default App
