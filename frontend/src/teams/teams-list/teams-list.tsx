import styled from "@emotion/styled";
import { colors } from "common/colors";
import { Team } from "teams/teams";
import * as ui from "common/ui";
import { useHistory } from "react-router-dom";
import { TeamItem } from "./team-item";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const NoTeamContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 40px;
  color: ${colors.darkMaroon};
  font-size: 20px;
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
  padding: 10px;
`;

const Header = styled.div`
  flex-basis: 150px;
  color: ${colors.white};
  font-weight: 700;

  &:first-of-type {
    flex-basis: 400px;
  }
`;

type Props = {
  teams: Team[];
  loading: boolean;
  onDelete: (teamID: number) => void;
};

const TeamsList = ({ teams, loading, onDelete }: Props): JSX.Element => {
  const history = useHistory();

  const redirect = () => {
    history.push("/teams/create");
  };

  const headerKeys = ["Name", "City", "Coach", "Manage"];

  return (
    <Container>
      {loading ? (
        <div>Loader</div>
      ) : (
        <TeamsListContainer>
          <HeaderContainer>
            {headerKeys.map((key, index) => (
              <Header key={index}>{key}</Header>
            ))}
          </HeaderContainer>

          {teams.map((team) => (
            <TeamItem key={team.id} team={team} onDelete={onDelete} />
          ))}

          {teams.length === 0 ? (
            <NoTeamContainer>There are no teams</NoTeamContainer>
          ) : null}

          <ButtonContainer>
            <ui.PrimaryButton onClick={() => redirect()}>
              Create Team
            </ui.PrimaryButton>
          </ButtonContainer>
        </TeamsListContainer>
      )}
    </Container>
  );
};

export default TeamsList;
