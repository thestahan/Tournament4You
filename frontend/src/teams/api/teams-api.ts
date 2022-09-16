import { parseBody } from "common/utils/parse-body";
import { ExtendedTeam, NewTeam, Team } from "teams/teams";

import { handleErrors } from "../../common/utils/handle-errors";
import { getToken } from "../../common/utils/local-storage";

type TeamsAPI = {
  getTeams: () => Promise<Team[]>;
  getTeam: (teamID: number) => Promise<ExtendedTeam>;
  addTeam: (team: NewTeam) => Promise<Team>;
  updateTeam: (team: Team) => Promise<void>;
  deleteTeam: (teamID: number) => Promise<void>;
};

const apiUrl = process.env.REACT_APP_API_URL;

const teamsAPI = (): TeamsAPI => ({
  getTeams: () => {
    return fetch(`${apiUrl}/teams`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then(parseBody)
      .then(handleErrors)
      .then((response: { teams: Team[] }) => response.teams);
  },
  getTeam: (teamID: number) => {
    return fetch(`${apiUrl}/teams/${teamID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then(parseBody)
      .then(handleErrors)
      .then((response) => response);
  },
  addTeam: (team: NewTeam) => {
    return fetch(`${apiUrl}/teams`, {
      method: "POST",
      body: JSON.stringify(team),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then(parseBody)
      .then(handleErrors);
  },
  updateTeam: (team: Team) => {
    return fetch(`${apiUrl}/teams/${team.id}`, {
      method: "PUT",
      body: JSON.stringify(team),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then(parseBody)
      .then(handleErrors);
  },
  deleteTeam: (teamID: number) => {
    return fetch(`${apiUrl}/teams/${teamID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then(parseBody)
      .then(handleErrors);
  },
});

export default teamsAPI;
