import styled from "@emotion/styled";
import { isAuthenticated } from "common/api/utils/local-storage";

const Container = styled.div`
  height: 100%;
`;

const Header = styled.div`
  margin-bottom: 20px;
`;

const DashboardRoute = () => {
  const authenticated = isAuthenticated();

  return (
    <Container>
      {authenticated ? (
        <div>Jestem zalogowany</div>
      ) : (
        <div>
          <Header>Nie jestem zalogowany</Header>
        </div>
      )}
    </Container>
  );
};

export default DashboardRoute;
