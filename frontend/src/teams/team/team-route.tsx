import styled from "@emotion/styled";
import { colors } from "common/colors";
import { PageHeader } from "common/page-container";
import { PlayersList } from "players/players-list/players-list";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import teamsAPI from "teams/api/teams-api";
import { Team } from "teams/teams";
import TeamForm from "../team-add/team-form";

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  column-gap: 20px;
`;

const ContentCard = styled.div<{ fullWidth?: boolean }>`
  background-color: ${colors.white};
  border-radius: 15px;
  box-shadow: 0px 0px 28px -15px rgba(0, 0, 0, 1);
  padding: 25px;
  width: ${(props) => (props.fullWidth ? "100%" : "fit-content")};
  height: 300px;
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
      <ContentContainer>
        <ContentCard>
          <TeamForm onFormSubmit={onFormSubmit} team={team} />
        </ContentCard>
        <ContentCard fullWidth={true}>
          <PlayersList team={team} onFormSubmit={onFormSubmit} />
        </ContentCard>
      </ContentContainer>
    </Container>
  ) : null;
};

export default TeamRoute;
