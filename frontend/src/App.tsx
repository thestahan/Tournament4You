import styled from "@emotion/styled";
import AboutRoute from "about/about-route";
import LoginRoute from "account/login-route";
import RegisterRoute from "account/register-route";
import ArchiveRoute from "archive/archive-route";
import { getToken } from "common/api/utils/local-storage";
import PageContainer from "common/page-container";
import ContactRoute from "contact/contact-route";
import DashboardRoute from "dashboard/dashboard-route";
import { FC } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from "react-router-dom";
import TeamsRoute from "teams/teams-route";
import TournamentRoute from "tournaments/tournament-route";
import AuthProvider from "common/provide-auth";
import { Team } from "teams/team/team-route";
import { CreateTeam } from "teams/team/team-create";

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
    <Route path="/" exact={true}>
      <DashboardRoute />
    </Route>
    <ProtectedRoute path="/tournaments" exact={true}>
      <TournamentRoute />
    </ProtectedRoute>
    <ProtectedRoute path="/teams" exact={true}>
      <TeamsRoute />
    </ProtectedRoute>
    <ProtectedRoute path="/teams/create" exact={true}>
      <CreateTeam />
    </ProtectedRoute>
    <ProtectedRoute path="/teams/:teamId" exact={true}>
      <Team />
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
    <AuthProvider>
      <Container>
        <Router>
          <PageContainer>
            <MainRoutes />
          </PageContainer>
        </Router>
      </Container>
    </AuthProvider>
  );
};

export default App;
