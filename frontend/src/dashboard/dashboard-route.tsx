import styled from "@emotion/styled";
import { useState } from "react";
import * as ui from "common/ui";

const Container = styled.div`
  height: 100%;
`;

const Header = styled.div`
  margin-bottom: 20px;
`;

const DashboardRoute = () => {
  const [currentUser, setCurrentUser] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container>
      {currentUser ? (
        <div>Jestem zalogowany</div>
      ) : (
        <div>
          <Header>Nie jestem zalogowany</Header>
          <br />
          <ui.TextInput
            label="Firstname"
            value={firstname}
            setValue={setFirstname}
          ></ui.TextInput>
          <ui.PasswordInput
            label="Password"
            value={password}
            setValue={setPassword}
          ></ui.PasswordInput>
        </div>
      )}
    </Container>
  );
};

export default DashboardRoute;
