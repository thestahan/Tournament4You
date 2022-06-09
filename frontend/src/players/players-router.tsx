import { Route, Switch } from "react-router-dom";
import { PlayerAddRoute } from "./player-add/player-add-route";

export const PlayersRouter = () => {
  return (
    <Switch>
      <Route path={"/teams/:teamId/player/create"}>
        <PlayerAddRoute></PlayerAddRoute>
      </Route>
    </Switch>
  );
};
