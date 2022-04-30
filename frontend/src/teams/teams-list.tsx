import styled from "@emotion/styled";
import { Team } from "common/model/teams";
import { FC } from "react";
import { CreateTeamItem } from "./teams-create-item";
import { TeamItem } from "./teams-item";

type TeamsListType = FC<{ teams: Team[] }>;

const TeamsListContainer = styled.div`
  margin-top: 20px;
  padding: 20px 0 20px 0;
  display: flex;
  flex-direction: column;
`;

const TeamContainer = styled.div`
  position: relative;
`;

export const TeamsList: TeamsListType = ({ teams }) => {
  const teamsList = teams.map((team, index) => {
    return (
      <TeamContainer key={team.id}>
        <TeamItem index={index} team={team}></TeamItem>
      </TeamContainer>
    );
  });

  return (
    <TeamsListContainer>
      {teamsList}
      <CreateTeamItem></CreateTeamItem>
    </TeamsListContainer>
  );
};
