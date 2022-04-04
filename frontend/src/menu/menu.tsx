import styled from "@emotion/styled";
import { colors } from "common/colors";
import { NavLink } from "react-router-dom";

const Container = styled.div`
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: sticky;
  left: 0;
  top: 0;
  background-color: ${colors.white};
  box-shadow: 3px 0 20px -15px #000000;
`;

const LogoContainer = styled.div`
  width: 100%;
  height: 15%;
`;

const MenuContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  row-gap: 40px;
`;

const MenuItemLink = styled(NavLink)`
  width: 80%;
  text-decoration: none;
  text-align; center;
  font-size: 24px;

  text-style: none;
  color: ${colors.black};

  &.active {
    background-color: ${colors.moderatePink};
    padding: 0px 10px;
    border-radius: 10px;
  }
`;

const MenuItem = styled.div`
  width: 80%;
  text-decoration: none;
  text-align; center;
  font-size: 24px;

  text-style: none;
  color: ${colors.black};

  &.active {
    background-color: ${colors.moderatePink};
    padding: 0px 10px;
    border-radius: 10px;
  }
`;

const AuthContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: 30px;

  row-gap: 40px;
`;

const Menu: React.FC = () => {
  return (
    <Container>
      <LogoContainer>LOGO</LogoContainer>
      <MenuContent>
        <MenuItemLink to="/" exact={true}>
          Home
        </MenuItemLink>
        <MenuItemLink to="/tournaments">Tournaments</MenuItemLink>
        <MenuItemLink to="teams">Teams</MenuItemLink>
        <MenuItemLink to="/archives">Archive</MenuItemLink>
        <MenuItemLink to="/contact">Contact</MenuItemLink>
        <MenuItemLink to="/about">About us</MenuItemLink>
      </MenuContent>
      <AuthContent>
        <MenuItem>Logout</MenuItem>
      </AuthContent>
    </Container>
  );
};

export default Menu;
