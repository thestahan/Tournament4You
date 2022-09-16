import styled from "@emotion/styled";
import { colors } from "common/colors";
import { PageHeader } from "common/page-container";
import playersAPI from "players/api/players-api";
import { NewPlayer, Position } from "players/players";
import { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import store from "store/store";
import { getExtendedTeam } from "teams/teams-slice";
import { PlayerForm } from "./player-form";

type Params = {
  teamId: string;
};

const Container = styled.div``;
const Content = styled.div`
  background-color: ${colors.white};
  border-radius: 15px;
  box-shadow: 0px 0px 28px -15px rgba(0, 0, 0, 1);
  padding: 25px;
  width: fit-content;
`;

export const PlayerAddRoute = () => {
  const params = useParams<Params>();
  const api = playersAPI();
  const history = useHistory();

  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    api.getPositions().then((positions) => setPositions(positions));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFormSubmit = useCallback((player: NewPlayer) => {
    api.addPlayerToTeam(params.teamId, player).then(() => {
      store.dispatch(getExtendedTeam(parseInt(params.teamId)));
      history.push(`/teams/${params.teamId}`);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <PageHeader>Add Player</PageHeader>
      <Content>
        <PlayerForm onFormSubmit={onFormSubmit} positions={positions} />
      </Content>
    </Container>
  );
};
