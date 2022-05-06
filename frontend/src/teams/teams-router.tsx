import { Route, Switch } from "react-router-dom";
import { CreateTeam } from "./team/team-create";
import { TeamView } from "./team/team-view";
import { TeamsListRoute } from "./teams-list/teams-list-route";

export const TeamsRouter = () => {
  return (
    <Switch>
      <Route path={"/teams/create"}>
        <CreateTeam />
      </Route>
      <Route path={"/teams/:teamId"}>
        <TeamView />
      </Route>
      <Route path={"/teams"}>
        <TeamsListRoute />
      </Route>
    </Switch>
  );
};
