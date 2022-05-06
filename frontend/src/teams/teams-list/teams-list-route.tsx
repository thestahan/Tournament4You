import { useCallback, useEffect, useState } from "react";
import teamsAPI from "teams/api/teams-api";
import { Team } from "teams/teams";
import TeamsList from "./teams-list";
import { PageHeader } from "common/page-container";

export const TeamsListRoute = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const api = teamsAPI();

  useEffect(() => {
    const api = teamsAPI();
    api
      .getTeams()
      .then(setTeams)
      .finally(() => setLoading(false));
  }, []);

  const onDelete = useCallback(
    (teamID: number) => {
      api.deleteTeam(teamID).finally(() => {
        setTeams(teams.filter((t) => t.id !== teamID));
      });
    },
    [api, teams]
  );

  return (
    <>
      <PageHeader>Available teams</PageHeader>
      <TeamsList teams={teams} loading={loading} onDelete={onDelete} />
    </>
  );
};
