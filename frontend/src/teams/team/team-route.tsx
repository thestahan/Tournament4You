import styled from "@emotion/styled";
import { colors } from "common/colors";
import { PageHeader } from "common/page-container";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import teamsAPI from "teams/api/teams-api";
import { Team } from "teams/teams";
import TeamForm from "../team-add/team-form";

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const Content = styled.div`
  background-color: ${colors.white};
  border-radius: 15px;
  box-shadow: 0px 0px 28px -15px rgba(0, 0, 0, 1);
  padding: 25px;
  width: fit-content;
`;

type Params = {
  teamId: string;
};

const TeamRoute = () => {
  const api = teamsAPI();
  const params = useParams<Params>();
  const [team, setTeam] = useState<Team>();

  useEffect(() => {
    api.getTeam(parseInt(params.teamId)).then(setTeam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.teamId]);

  const onFormSubmit = useCallback((team: Team) => {
    api.updateTeam(team);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return team ? (
    <Container>
      <PageHeader>Manage Team</PageHeader>
      <Content>
        <TeamForm onFormSubmit={onFormSubmit} team={team} />
      </Content>
    </Container>
  ) : null;
};

export default TeamRoute;
