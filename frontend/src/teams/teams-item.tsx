import styled from "@emotion/styled";
import { colors } from "common/colors";
import { Team } from "common/model/teams";
import { FC, useState } from "react";
import { NavLink } from "react-router-dom";

type TeamItemType = FC<{
  team: Team;
  index: number;
}>;

const TeamItemLinkLink = styled(NavLink)`
  text-decoration: none;
  color: ${colors.darkMaroon};
`;

const TeamItemContainer = styled.div<{ index: number; onTeamHover: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.index % 2 ? colors.beige : "")};
  opacity: ${(props) => (props.onTeamHover ? 1 : 0.8)};
  transition: 0.2s opacity ease-in-out;
`;

const TeamListItem = styled.div<{ index: number }>`
  flex-basis: 200px;
  flex-grow: 1;
  padding-left: ${(props) => {
    return props.index === 1 ? "10px" : "";
  }};
`;

const Separator = styled.span<{ onTeamHover: boolean }>`
  height: 2px;
  width: 100%;
  background-color: ${colors.darkMaroon};
  position: absolute;
  left: 0;
  bottom: -1px;
  border-radius: 5px;
  z-index: 1;
  opacity: ${(props) => (props.onTeamHover ? 1 : 0)};
  transition: 0.2s opacity ease-in-out; ;
`;

export const TeamItem: TeamItemType = ({ team, index }) => {
  const [onTeamHover, setOnTeamHover] = useState(false);
  return (
    <TeamItemLinkLink to={`/teams/${team.id}`}>
      <TeamItemContainer
        index={index}
        onTeamHover={onTeamHover}
        onMouseEnter={() => setOnTeamHover(true)}
        onMouseLeave={() => setOnTeamHover(false)}
      >
        <TeamListItem index={1}>{team.name}</TeamListItem>
        <TeamListItem index={2}>{team.city}</TeamListItem>
        <TeamListItem index={3}>{team.coach}</TeamListItem>
        <Separator onTeamHover={onTeamHover}></Separator>
      </TeamItemContainer>
    </TeamItemLinkLink>
  );
};
