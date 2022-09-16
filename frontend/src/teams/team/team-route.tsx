import styled from "@emotion/styled";
import { colors } from "common/colors";
import { PageHeader } from "common/page-container";
import playersAPI from "players/api/players-api";
import { PlayersList } from "players/players-list/players-list";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import store from "store/store";
import { Team } from "teams/teams";
import { getExtendedTeam, TeamState, updateTeam } from "teams/teams-slice";
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
  const playersApi = playersAPI();
  const params = useParams<Params>();

  const extendedTeam = useSelector((state: { teams: TeamState }) =>
    state.teams.extendedList.find(
      (extendedTeam) => extendedTeam.id === parseInt(params.teamId)
    )
  );

  const deletePlayer = (playerId: number) => {
    if (!extendedTeam) {
      return;
    }
    playersApi
      .deletePlayer(extendedTeam.id, playerId)
      .then(() => store.dispatch(getExtendedTeam(extendedTeam.id)));
  };

  useEffect(() => {
    if (!extendedTeam) {
      store.dispatch(getExtendedTeam(parseInt(params.teamId)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.teamId]);

  const onFormSubmit = useCallback((team: Team) => {
    store.dispatch(updateTeam(team));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return extendedTeam ? (
    <Container>
      <PageHeader>Manage Team</PageHeader>
      <ContentContainer>
        <ContentCard>
          <TeamForm onFormSubmit={onFormSubmit} team={extendedTeam} />
        </ContentCard>
        <ContentCard fullWidth={true}>
          <PlayersList
            players={extendedTeam.players}
            teamId={extendedTeam.id}
            deletePlayer={deletePlayer}
          />
        </ContentCard>
      </ContentContainer>
    </Container>
  ) : null;
};

export default TeamRoute;
