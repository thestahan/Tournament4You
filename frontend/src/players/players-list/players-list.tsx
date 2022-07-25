import styled from "@emotion/styled";
import { Player } from "players/players";
import { colors } from "common/colors";
import { ui } from "common/index";
import { NavLink } from "react-router-dom";
import { Delete } from "@styled-icons/typicons/Delete";

const PlayersContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const PlayersHeaderContainer = styled.div`
  font-size: 14px;
`;

const PlayersListContainer = styled.div`
  display: flex;
  margin-top: 10px;
  row-gap: 10px;
  column-gap: 10px;
  flex-wrap: wrap;
  overflow: scroll;
`;

const PlayerCardContainer = styled.div`
  height: fit-content;
  background-color: ${colors.darkMaroon};
  color: ${colors.white};
  padding: 10px 20px;
  border-radius: 5px;
  flex-grow: 1;

  /* flex-basis: 200px; */
  cursor: default;

  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  font-size: 14px;
`;

const PlayerTextContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const PlayerDeleteButton = styled(Delete)`
  margin-left: 10px;
  /* font-size: 16px; */
  width: 24px;
  height: 24px;
  /* margin-left: auto; */
  color: ${colors.white};
  transition: color 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    color: ${colors.moderatePink};
  }
`;

const PlayerPositionContainer = styled.div`
  font-size: 12px;
`;

const AddPlayerButtonContainer = styled.div`
  padding-top: 5px;
  margin: auto auto 0 auto;
`;

type Props = {
  players: Player[] | undefined;
  teamId: number;
  deletePlayer: (playerId: number) => void;
};

export const PlayersList = ({
  players,
  teamId,
  deletePlayer,
}: Props): JSX.Element => {
  return (
    <PlayersContainer>
      <PlayersHeaderContainer>Players</PlayersHeaderContainer>
      {players ? (
        <>
          <PlayersListContainer>
            {players.map((player) => (
              <PlayerCardContainer key={player.id}>
                <PlayerTextContent>
                  <PlayerPositionContainer>
                    {player.position}
                  </PlayerPositionContainer>
                  {player.name} {player.surname}
                </PlayerTextContent>
                <PlayerDeleteButton
                  onClick={() => deletePlayer(player.id)}
                ></PlayerDeleteButton>
              </PlayerCardContainer>
            ))}
          </PlayersListContainer>
        </>
      ) : null}
      <AddPlayerButtonContainer>
        <NavLink to={`/teams/${teamId}/player/create`}>
          <ui.SecondaryButton width="100%">Add Player</ui.SecondaryButton>
        </NavLink>
      </AddPlayerButtonContainer>
    </PlayersContainer>
  );
};
