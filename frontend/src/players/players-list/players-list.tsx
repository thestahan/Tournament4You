import styled from "@emotion/styled";
import { Player } from "players/players";
import { useEffect, useState } from "react";
import { Team } from "teams/teams";
import { colors } from "common/colors";
import { ui } from "common/index";
import { NavLink } from "react-router-dom";
import playersAPI from "players/api/players-api";

const PlayersHeaderContainer = styled.div`
  font-size: 14px;
`;

const PlayersListContainer = styled.div`
  display: flex;
  margin-top: 10px;
  row-gap: 10px;
  column-gap: 10px;
  flex-wrap: wrap;
  height: 183px;
  overflow: scroll;
`;

const PlayerCardContainer = styled.div`
  height: fit-content;
  background-color: ${colors.darkMaroon};
  color: ${colors.white};
  padding: 5px;
  border-radius: 5px;
  flex-basis: 200px;
  flex-grow: 1;
  cursor: default;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`;

const PlayerDeleteButton = styled.div`
  margin-bottom: 5px;
  font-size: 16px;
  color: #f75151;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const PlayerPositionContainer = styled.div`
  font-size: 12px;
`;

const AddPlayerButtonContainer = styled.div`
  flex-basis: 100%;
  flex-grow: 1;
  margin-top: 10px;
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
    api.deletePlayer(team.id, playerId);
    setPlayers(players.filter((player) => player.id !== playerId));
  };

  return (
    <>
      <PlayersHeaderContainer>Players</PlayersHeaderContainer>
      {players.length ? (
        <>
          <PlayersListContainer>
            {players.map((player, index) => (
              <PlayerCardContainer key={player.id}>
                <PlayerDeleteButton onClick={() => deletePlayer(player.id)}>
                  Remove Player
                </PlayerDeleteButton>
                <PlayerPositionContainer>
                  {player.position}
                </PlayerPositionContainer>
                {player.name} {player.surname}
              </PlayerCardContainer>
            ))}
          </PlayersListContainer>
          <AddPlayerButtonContainer>
            <AddPlayerLink to={addPlayerUrl}>
              <ui.SecondaryButton width="100%">Add Player</ui.SecondaryButton>
            </AddPlayerLink>
          </AddPlayerButtonContainer>
        </>
      ) : (
        <>
          <AddPlayerButtonContainer>
            <AddPlayerLink to={addPlayerUrl}>
              <ui.SecondaryButton width="100%">Add Player</ui.SecondaryButton>
            </AddPlayerLink>
          </AddPlayerButtonContainer>
        </>
      )}
    </>
  );
};
