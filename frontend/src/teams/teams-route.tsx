import styled from "@emotion/styled";
import { colors } from "common/colors";

import * as ui from "common/ui";
import { NavLink } from "react-router-dom";
import { TeamsList } from "./teams-list";
import { teams } from "./temporary-config";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const TeamsHeaderContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${colors.moderatePink};
  border-radius: 5px;
`;

const TeamsHeaderList = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const TeamsHeader = styled.div<{ index: number }>`
  flex-basis: 200px;
  flex-grow: 1;
  color: ${colors.white};
  font-weight: 700;
  padding-left: ${(props) => {
    return props.index === 0 ? "10px" : "";
  }};
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const NoTeamContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 40px;
  color: ${colors.darkMaroon};
  font-size: 20px;
`;

const ButtonLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
`;

const TeamsRoute = () => {
  const headerKeys = ["Name", "City", "Coach"];

  const teamsHeaderList = headerKeys.map((key, index) => {
    return (
      <TeamsHeader index={index} key={index}>
        {key}
      </TeamsHeader>
    );
  });

  return (
    <Container>
      <TeamsHeaderContainer>
        <TeamsHeaderList>{teamsHeaderList}</TeamsHeaderList>
      </TeamsHeaderContainer>
      {teams.length !== 0 ? (
        <>
          <TeamsList teams={teams}></TeamsList>
        </>
      ) : (
        <>
          <NoTeamContainer>There is no teams available</NoTeamContainer>
          <ButtonLink to={"/teams/create"}>
            <ButtonContainer>
              <ui.PrimaryButton>Create team</ui.PrimaryButton>
            </ButtonContainer>
          </ButtonLink>
        </>
      )}
    </Container>
  );
};

export default TeamsRoute;
