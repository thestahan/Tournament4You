import styled from "@emotion/styled";
import { isAuthenticated } from "common/utils/local-storage";
import { PageHeader } from "common/page-container";
import { AuthenticatedDashboard } from "./authenticated";

const Container = styled.div`
  height: 100%;
`;

const DashboardRoute = () => {
  const authenticated = isAuthenticated();

  return (
    <Container>
      <PageHeader>Dashboard</PageHeader>
      {authenticated ? (
        <AuthenticatedDashboard />
      ) : (
        <div>Not authenticated</div>
      )}
    </Container>
  );
};

export default DashboardRoute;
