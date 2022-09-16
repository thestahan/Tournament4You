import { useCallback, useEffect } from "react";
import TeamsList from "./teams-list";
import { PageHeader } from "common/page-container";
import { useSelector } from "react-redux";
import store from "store/store";
import { deleteTeam, getTeams } from "teams/teams-slice";

export const TeamsListRoute = () => {
  const teams = useSelector((state: any) => state.teams.list);
  const loading = useSelector((state: any) => state.teams.loading);

  useEffect(() => {
    if (!teams || teams.length === 0) {
      store.dispatch(getTeams());
    }
  }, [teams]);

  const onDelete = useCallback(
    (teamID: number) => store.dispatch(deleteTeam(teamID)),
    []
  );

  return (
    <>
      <PageHeader>Available teams</PageHeader>
      <TeamsList teams={teams} loading={loading} onDelete={onDelete} />
    </>
  );
};
