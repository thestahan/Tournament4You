import styled from "@emotion/styled";
import { colors } from "common/colors";
import { FC } from "react";
import { NavLink } from "react-router-dom";

type CreateTeamItemType = FC<{}>;

const CreateTeamItemContainer = styled(NavLink)`
  width: 25%;
  margin: 0 0 0 auto;
  background-color: ${colors.darkMaroon};
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: 0.3s ease-in-out;
  border: 1px solid ${colors.darkMaroon};
  color: ${colors.whiteSmoke};
  text-decoration: none;
  text-align: center;
  &:hover {
    background-color: ${colors.white};
    color: ${colors.darkMaroon};
    border: 1px solid ${colors.darkMaroon};
    transform: scale(1.03);
    transition: 0.3s ease-in-out;
  }
`;

export const CreateTeamItem: CreateTeamItemType = () => {
  return (
    <CreateTeamItemContainer to={"/teams/create"}>
      Create Team
    </CreateTeamItemContainer>
  );
};
