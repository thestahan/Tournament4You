import styled from "@emotion/styled";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageContainer from "common/page-container";
import SignupRoute from "account/signup-route";
import LoginRoute from "account/login-route";
import DashboardRoute from "dashboard/dashboard-route";
import TournamentRoute from "tournaments/tournament-route";
import ArchiveRoute from "archive/archive-route";
import AboutRoute from "about/about-route";
import ContactRoute from "contact/contact-route";
import TeamsRoute from "teams/teams-route";

const Container = styled.div``;

const MainRoutes = () => (
  <Switch>
    <Route path="/" exact={true}>
      <DashboardRoute />
    </Route>
    <Route path="/login" exact={true}>
      <LoginRoute />
    </Route>
    <Route path="/register" exact={true}>
      <SignupRoute />
    </Route>
    <Route path="/tournaments" exact={true}>
      <TournamentRoute />
    </Route>
    <Route path="/teams" exact={true}>
      <TeamsRoute />
    </Route>
    <Route path="/archives" exact={true}>
      <ArchiveRoute />
    </Route>
    <Route path="/contact" exact={true}>
      <ContactRoute />
    </Route>
    <Route path="/about" exact={true}>
      <AboutRoute />
    </Route>
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
