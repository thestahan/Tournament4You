import styled from "@emotion/styled";
import { Player } from "players/players";
import { useEffect, useState } from "react";
import { Team } from "teams/teams";
import { colors } from "common/colors";
import { ui } from "common/index";
import { NavLink } from "react-router-dom";
import playersAPI from "players/api/players-api";
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

const AddPlayerLink = styled(NavLink)``;

type Props = {
  team: Team;
  onFormSubmit: (team: Team) => void;
};

export const PlayersList = ({ team, onFormSubmit }: Props): JSX.Element => {
  const [players, setPlayers] = useState<Player[]>([]);

  const api = playersAPI();

  const addPlayerUrl = `/teams/${team.id}/player/create`;

  useEffect(() => {
    setPlayers(team.players?.length ? team.players : []);
  }, [team.players]);

  const deletePlayer = (playerId: number) => {
    api.deletePlayer(team.id, playerId).then(() => {
      setPlayers(players.filter((player) => player.id !== playerId));
    });
  };

  return (
    <PlayersContainer>
      <PlayersHeaderContainer>Players</PlayersHeaderContainer>
      {players.length ? (
        <>
          <PlayersListContainer>
            {players.map((player, index) => (
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
        <AddPlayerLink to={addPlayerUrl}>
          <ui.SecondaryButton width="100%">Add Player</ui.SecondaryButton>
        </AddPlayerLink>
      </AddPlayerButtonContainer>
    </PlayersContainer>
  );
};
