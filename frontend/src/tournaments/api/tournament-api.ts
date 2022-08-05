import { parseBody } from "common/utils/parse-body";
import { NewTournament, Tournament } from "tournaments/tournaments";

import { handleErrors } from "../../common/utils/handle-errors";
import { getToken } from "../../common/utils/local-storage";

type TournamentAPI = {
  getTournament: (tournamentId: number) => Promise<Tournament>;
  addTournament: (newTournament: NewTournament) => Promise<void>;
  deleteTournament: (tournamentId: number) => Promise<void>;
};

const apiUrl = process.env.REACT_APP_API_URL;

const tournamentAPI = (): TournamentAPI => ({
  getTournament: (tournamentId: number) => {
    return fetch(`${apiUrl}/tournaments/${tournamentId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then(parseBody)
      .then(handleErrors)
      .then((response) => response);
  },
  addTournament: (tournament: NewTournament) => {
    return fetch(`${apiUrl}/tournaments`, {
      method: "POST",
      body: JSON.stringify(tournament),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then(parseBody)
      .then(handleErrors);
  },
  deleteTournament: (tournamentId: number) => {
    return fetch(`${apiUrl}/tournaments/${tournamentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }).then(parseBody);
    // .then(handleErrors);
  },
});

export default tournamentAPI;
