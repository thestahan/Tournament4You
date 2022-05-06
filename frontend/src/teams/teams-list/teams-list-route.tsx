import styled from "@emotion/styled";
import { colors } from "common/colors";
import { useEffect, useState } from "react";
import teamsAPI from "teams/api/teams-api";
import { Team } from "teams/teams";
import TeamsList from "./teams-list";

const Header = styled.div`
  margin-bottom: 20px;
  font-size: 20px;
  border-bottom: 1px solid ${colors.darkMaroon};
  color: ${colors.darkMaroon};
  padding-left: 10px;
`;

export const TeamsListRoute = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const api = teamsAPI();
    api
      .getTeams()
      .then(setTeams)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header>Available teams</Header>
      <TeamsList teams={teams} loading={loading} />
    </>
  );
};
