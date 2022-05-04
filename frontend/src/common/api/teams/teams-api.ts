import { parseBody } from "common/api/utils/parse-body";
import { Team } from "common/model/teams";
import { handleErrors } from "../utils/handle-errors";
import { getToken } from "../utils/local-storage";

type TeamsAPI = {
  getTeams: () => Promise<Team[]>;
};

const teamsAPI = (): TeamsAPI => ({
  getTeams: () => {
    return fetch("https://localhost:7094/api/teams", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then(parseBody)
      .then(handleErrors)
      .then((response: { teams: Team[] }) => response.teams);
  },
});

export default teamsAPI;
