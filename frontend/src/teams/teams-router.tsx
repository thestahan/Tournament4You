import { Route, Switch } from "react-router-dom";
import { CreateTeam } from "./team/team-create";
import TeamsList from "./teams-list";
import teamsApi from "common/api/teams/teams-api";
import { useEffect, useState } from "react";
import { TeamDetails } from "./team/team-details";
import { Team } from "common/model/teams";

export const TeamsRouter = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  const api = teamsApi();

  useEffect(() => {
    api.getTeams().then(setTeams);
  }, []);

  return (
    <Switch>
      <Route path={"/teams/create"}>
        <CreateTeam />
      </Route>
      <Route path={"/teams/:teamId"}>
        <TeamDetails />
      </Route>
      <Route path={"/teams"}>
        <TeamsList teams={teams} />
      </Route>
    </Switch>
  );
};
