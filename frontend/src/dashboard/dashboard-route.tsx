import styled from "@emotion/styled";
import { useState } from "react";

const Container = styled.div`
  height: 100%;
`;

const Header = styled.div`
  margin-bottom: 20px;
`;

const DashboardRoute = () => {
  const [currentUser, setCurrentUser] = useState(false);

  return (
    <Container>
      {currentUser ? (
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
