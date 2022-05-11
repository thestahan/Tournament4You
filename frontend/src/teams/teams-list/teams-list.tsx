import styled from "@emotion/styled";
import { colors } from "common/colors";
import { Team } from "teams/teams";
import * as ui from "common/ui";
import { NavLink, useHistory } from "react-router-dom";
import { TeamItem } from "./team-item";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const NoTeamButtonContainer = styled.div`
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

const TeamsListContainer = styled.div`
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  height: 50px;
  background-color: ${colors.moderatePink};
  border-radius: 5px;
`;

const Header = styled.div<{ index: number }>`
  flex-basis: 200px;
  flex-grow: 1;
  color: ${colors.white};
  font-weight: 700;
  padding-left: ${(props) => {
    return props.index === 0 ? "10px" : "";
  }};
`;

type Props = {
  teams: Team[];
  loading: boolean;
};

const TeamsList = ({ teams, loading }: Props): JSX.Element => {
  const history = useHistory();

  const redirect = () => {
    history.push("/teams/create");
  };

  const headerKeys = ["Name", "City", "Coach"];

  return (
    <Container>
      {loading ? (
        <>
          {/* Do zmiany */}
          <div>Loader</div>
        </>
      ) : (
        <>
          <TeamsListContainer>
            <HeaderContainer>
              {headerKeys.map((key, index) => (
                <Header index={index} key={index}>
                  {key}
                </Header>
              ))}
            </HeaderContainer>
            {teams.length !== 0 ? (
              teams.map((team) => (
                <TeamItem key={team.id} team={team}></TeamItem>
              ))
            ) : (
              <>
                <NoTeamContainer>There are no teams available</NoTeamContainer>
                <ButtonLink to={"/teams/create"}>
                  <NoTeamButtonContainer>
                    <ui.PrimaryButton>Create team</ui.PrimaryButton>
                  </NoTeamButtonContainer>
                </ButtonLink>
              </>
            )}
            <ButtonContainer>
              <ui.PrimaryButton onClick={() => redirect()}>
                Create Team
              </ui.PrimaryButton>
            </ButtonContainer>
          </TeamsListContainer>
        </>
      )}
    </Container>
  );
};

export default TeamsList;
