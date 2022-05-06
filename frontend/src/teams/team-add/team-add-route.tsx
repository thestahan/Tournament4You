import styled from "@emotion/styled";
import { PageHeader } from "common/page-container";
import teamsAPI from "teams/api/teams-api";
import TeamForm from "./team-form";
import { useCallback } from "react";
import { NewTeam } from "teams/teams";
import { colors } from "common/colors";

const Container = styled.div`
  height: 100%;
  width: 100%;
`;
const Content = styled.div`
  background-color: ${colors.white};
  border-radius: 15px;
  box-shadow: 0px 0px 28px -15px rgba(0, 0, 0, 1);
  padding: 25px;
  width: fit-content;
`;

const TeamAddRoute = () => {
  const api = teamsAPI();

  const onFormSubmit = useCallback((team: NewTeam) => {
    api.addTeam(team);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
