import styled from "@emotion/styled";
import colors from "common/colors";

const Container = styled.div`
  width: 20%;
  height: 100vh;
  display: flex;
  position: sticky;
  left: 0;
  top: 0;
  background-color: ${colors.black};
`;

const Menu: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Menu;
