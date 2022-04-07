import styled from "@emotion/styled";
import {
  BrowserRouter as Router,
  Route,
  RouteProps,
  Switch,
  useHistory,
  Redirect,
} from "react-router-dom";
import { FC } from "react";

import LoginRoute from "account/login-route";
import DashboardRoute from "dashboard/dashboard-route";
import TournamentRoute from "tournaments/tournament-route";
import ArchiveRoute from "archive/archive-route";
import AboutRoute from "about/about-route";
import ContactRoute from "contact/contact-route";
import TeamsRoute from "teams/teams-route";
import RegisterRoute from "account/register-route";

import PageContainer from "common/page-container";
import { getToken } from "common/api/utils/local-storage";

const Container = styled.div``;

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const token = getToken();

  return (
    <Route
      {...rest}
      render={() => (token !== null ? children : <Redirect to={"/login"} />)}
    />
  );
};

const MainRoutes = () => (
  <Switch>
    <Route path="/login" exact={true}>
      <LoginRoute />
    </Route>
    <Route path="/register" exact={true}>
      <RegisterRoute />
    </Route>
    <ProtectedRoute path="/" exact={true}>
      <DashboardRoute />
    </ProtectedRoute>
    <ProtectedRoute path="/tournaments" exact={true}>
      <TournamentRoute />
    </ProtectedRoute>
    <ProtectedRoute path="/teams" exact={true}>
      <TeamsRoute />
    </ProtectedRoute>
    <ProtectedRoute path="/archives" exact={true}>
      <ArchiveRoute />
    </ProtectedRoute>
    <ProtectedRoute path="/contact" exact={true}>
      <ContactRoute />
    </ProtectedRoute>
    <ProtectedRoute path="/about" exact={true}>
      <AboutRoute />
    </ProtectedRoute>
  </Switch>
);

const App = () => {
  return (
    <Container>
      <Router>
        <PageContainer>
          <MainRoutes />
        </PageContainer>
      </Router>
    </Container>
  );
};

export default App;
