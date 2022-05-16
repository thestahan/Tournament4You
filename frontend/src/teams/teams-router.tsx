import { Route, Switch } from "react-router-dom";
import TeamRoute from "./team/team-route";
import { TeamsListRoute } from "./teams-list/teams-list-route";
import TeamAddRoute from "./team-add/team-add-route";

export const TeamsRouter = () => {
  return (
    <Switch>
      <Route path={"/teams/create"}>
        <TeamAddRoute />
      </Route>
      <Route path={"/teams/:teamId"}>
        <TeamRoute />
      </Route>
      <Route path={"/teams"}>
        <TeamsListRoute />
      </Route>
    </Switch>
  );
};
