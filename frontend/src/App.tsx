import styled from "@emotion/styled";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignupRoute from "account/signup-route";
import LoginRoute from "account/login-route";
import { Dashboard } from "dashboard/dashboard";
import PageContainer from "common/page-container";

const Container = styled.div``;

const MainRoutes = () => (
  <Switch>
    <Route path="/" exact={true}>
      <Dashboard />
    </Route>
    <Route path="/login" exact={true}>
      <LoginRoute />
    </Route>
    <Route path="/register" exact={true}>
      <SignupRoute />
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
