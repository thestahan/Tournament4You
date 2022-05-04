import styled from "@emotion/styled";
import userAPI from "common/api/user/user-api";
import { colors } from "common/colors";
import { AuthContext } from "common/provide-auth";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { images } from "common";

const Container = styled.div`
  min-width: 250px;
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
  align-items: center;
  display: flex;
  height: 15%;
  justify-content: center;
  width: 100%;

  img {
    height: 100%;
    width: 100%;
  }
`;

const MenuContent = styled.div`
  align-items: center;
  border-top: 2px solid ${colors.black};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 40px;
  row-gap: 40px;
`;

const MenuItemLink = styled(NavLink)`
  width: 80%;
  text-decoration: none;
  text-align: center;
  font-size: 24px;
  text-style: none;
  color: ${colors.black};

  &.active {
    background-color: ${colors.moderatePink};
    border-radius: 10px;
    color: white;
    padding: 5px 10px;
  }
`;

const MenuItem = styled.div`
  color: ${colors.black};
  cursor: pointer;
  font-size: 24px;
  text-decoration: none;
  text-align: center;
  text-style: none;
  width: 80%;
`;

const AuthContent = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: 30px;
  row-gap: 40px;
`;

const Menu = (): JSX.Element => {
  const authenticated = useContext(AuthContext);
  const api = userAPI();
  return (
    <Container>
      <LogoContainer>
        <img src={images.LogoBlack} alt="logo" />
      </LogoContainer>
      {authenticated ? (
        <>
          <MenuContent>
            <MenuItemLink to="/" exact={true}>
              Home
            </MenuItemLink>
            <MenuItemLink to="/tournaments">Tournaments</MenuItemLink>
            <MenuItemLink to="/teams">Teams</MenuItemLink>
            <MenuItemLink to="/archives">Archive</MenuItemLink>
            <MenuItemLink to="/contact">Contact</MenuItemLink>
            <MenuItemLink to="/about">About us</MenuItemLink>
          </MenuContent>
          <AuthContent>
            <MenuItem
              onClick={() => {
                api.logout();
                window.location.href = "/login";
              }}
            >
              Logout
            </MenuItem>
          </AuthContent>
        </>
      ) : (
        <MenuContent>
          <MenuItemLink to="/" exact={true}>
            Home
          </MenuItemLink>
          <MenuItemLink to="/register">Signup</MenuItemLink>
          <MenuItemLink to="/login">Login</MenuItemLink>
        </MenuContent>
      )}
    </Container>
  );
};

export default Menu;
