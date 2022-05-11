import { parseBody } from "common/utils/parse-body";
import { Team } from "teams/teams";
import { handleErrors } from "../../common/utils/handle-errors";
import { getToken } from "../../common/utils/local-storage";

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
