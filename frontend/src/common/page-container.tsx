import styled from "@emotion/styled";
import Menu from "menu/menu";

const Container = styled.div`
  margin: 0;
  padding: 0;
`;

const PageContainer: React.FC = ({ children }) => {
  return (
    <Container>
      <Menu>{children}</Menu>
    </Container>
  );
};

export default PageContainer;
