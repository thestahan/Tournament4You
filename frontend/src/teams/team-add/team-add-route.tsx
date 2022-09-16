import styled from "@emotion/styled";
import { PageHeader } from "common/page-container";
import TeamForm from "./team-form";
import { useCallback } from "react";
import { NewTeam } from "teams/teams";
import { colors } from "common/colors";
import store from "store/store";
import { addTeam } from "teams/teams-slice";

const Container = styled.div`
  height: 100%;
  width: 100%;
`;
const Content = styled.div<{ fullWidth?: boolean }>`
  background-color: ${colors.white};
  border-radius: 15px;
  box-shadow: 0px 0px 28px -15px rgba(0, 0, 0, 1);
  padding: 25px;
  width: ${(props) => (props.fullWidth ? "100%" : "fit-content")};
  height: 300px;
`;

const TeamAddRoute = () => {
  const onFormSubmit = useCallback((team: NewTeam) => {
    store.dispatch(addTeam(team));
  }, []);

  return (
    <Container>
      <PageHeader>Add Team</PageHeader>
      <Content>
        <TeamForm onFormSubmit={onFormSubmit} />
      </Content>
    </Container>
  );
};

export default TeamAddRoute;
