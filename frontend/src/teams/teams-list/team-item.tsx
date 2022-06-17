import styled from "@emotion/styled";
import { colors } from "common/colors";
import { Team } from "teams/teams";
import { NavLink } from "react-router-dom";

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
  flex-basis: 150px;

  &:first-of-type {
    flex-basis: 400px;
  }
`;

type Props = {
  team: Team;
  onDelete: (teamID: number) => void;
};

export const TeamItem = ({ team, onDelete }: Props): JSX.Element => (
  <TeamItemLink to={`/teams/${team.id}`}>
    <TeamItemContainer>
      <TeamDetails>{team.name}</TeamDetails>
      <TeamDetails>{team.city}</TeamDetails>
      <TeamDetails>{team.coach}</TeamDetails>
      <TeamDetails>
        <button
          onClick={(e) => {
            e.preventDefault();
            onDelete(team.id);
          }}
        >
          Delete
        </button>
      </TeamDetails>
    </TeamItemContainer>
  </TeamItemLink>
);
