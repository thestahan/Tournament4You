import styled from "@emotion/styled";
import AboutRoute from "about/about-route";
import LoginRoute from "account/login-route";
import RegisterRoute from "account/register-route";
import ArchiveRoute from "archive/archive-route";
import { getToken } from "common/utils/local-storage";
import PageContainer from "common/page-container";
import AuthProvider from "common/provide-auth";
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
import { TeamsRouter } from "teams/teams-router";
import TournamentRoute from "tournaments/tournament-route";

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
    <ProtectedRoute path="/teams">
      <TeamsRouter />
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
