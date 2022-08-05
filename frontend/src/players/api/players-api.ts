import { parseBody } from "common/utils/parse-body";
import { NewPlayer, Position } from "players/players";
import { Team } from "teams/teams";

import { handleErrors } from "../../common/utils/handle-errors";
import { getToken } from "../../common/utils/local-storage";

type PlayersAPI = {
  addPlayerToTeam: (teamId: string, player: NewPlayer) => Promise<Team | void>;
  deletePlayer: (teamId: number, playerId: number) => Promise<Team | void>;
  getPositions: () => Promise<Position[]>;
};

const apiUrl = process.env.REACT_APP_API_URL;

const playersAPI = (): PlayersAPI => {
  return {
    addPlayerToTeam: (id, player) => {
      return fetch(`${apiUrl}/teams/${id}/players`, {
        method: "POST",
        body: JSON.stringify(player),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then(parseBody)
        .then(handleErrors)
        .then((response: { team: Team }) => response.team);
    },
    deletePlayer: (teamId, playerId) => {
      return fetch(`${apiUrl}/teams/${teamId}/players/${playerId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then(parseBody)
        .then(handleErrors);
      // .then((response: { team: Team }) => response.team);
    },
    getPositions: () => {
      return fetch(`${apiUrl}/positions`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then(parseBody)
        .then(handleErrors)
        .then((response: { positions: Position[] }) => response.positions);
    },
  };
};

export default playersAPI;
