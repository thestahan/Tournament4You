import styled from "@emotion/styled";
import { colors } from "common/colors";
import { Team } from "teams/teams";
import { NavLink } from "react-router-dom";

type Props = {
  team: Team;
};

const TeamItemLink = styled(NavLink)`
  text-decoration: none;
  color: ${colors.darkMaroon};
  position: relative;
  border-radius: 5px;
  &:nth-of-type(even) {
    background-color: ${colors.beige};
  }
`;

const TeamItemContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  border-radius: 2px;
  opacity: 0.8;
  transition: 0.2s all ease-in-out;
  border-bottom: 2px solid transparent;
  &:hover {
    opacity: 1;
    border-bottom: 2px solid ${colors.darkMaroon};
  }
`;

const TeamDetails = styled.div`
  flex-basis: 200px;
  flex-grow: 1;

  &:nth-of-type(even) {
    padding-left: 10px;
  }
`;

export const TeamItem = ({ team }: Props): JSX.Element => (
  <TeamItemLink to={`/teams/${team.id}`}>
    <TeamItemContainer>
      <TeamDetails>{team.name}</TeamDetails>
      <TeamDetails>{team.city}</TeamDetails>
      <TeamDetails>{team.coach}</TeamDetails>
    </TeamItemContainer>
  </TeamItemLink>
);
