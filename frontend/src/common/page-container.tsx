import styled from "@emotion/styled";
import Menu from "menu/menu";
import { colors } from "./colors";

const Container = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
`;

export const PageHeader = styled.div`
  border-bottom: 2px solid ${colors.darkMaroon};
  color: ${colors.darkMaroon};
  font-size: 28px;
  font-weight: 1000;
  margin-bottom: 20px;
  padding-left: 25px;
`;

const Content = styled.div`
  width: 100%;
  height: 100vh;
  padding: 50px;
  background-color: ${colors.whiteSmoke};
`;

const PageContainer: React.FC = ({ children }) => {
  return (
    <Container>
      <Menu></Menu>
      <Content>{children}</Content>
    </Container>
  );
};

export default PageContainer;
