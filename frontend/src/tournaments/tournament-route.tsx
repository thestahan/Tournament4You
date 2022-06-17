import { PageHeader } from "common/page-container";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tournamentAPI from "./api/tournament-api";
import teamsAPI from "teams/api/teams-api";
import TournamentForm from "./tournament-form";
import { NewTournament, Tournament } from "./tournaments";
import { Team } from "teams/teams";
import TournamentList from "./tournament-list";

type Params = {
  tournamentId: string;
};

const TournamentRoute = () => {
  const tournamentApi = tournamentAPI();
  const [tournaments, setTournaments] = useState<Tournament[]>();
  const teamsApi = teamsAPI();
  const params = useParams<Params>();
  const [teams, setTeams] = useState<Team[]>();

  useEffect(() => {
    teamsApi.getTeams().then(setTeams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.tournamentId]);

  const onFormSubmit = useCallback((newTournament: NewTournament) => {
    tournamentApi.addTournament(newTournament);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const api = tournamentAPI();

  useEffect(() => {
    api.getTournaments().then(setTournaments);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(tournaments);

  return (
    <>
      <PageHeader>Tournaments</PageHeader>
      <TournamentForm onFormSubmit={onFormSubmit} selectableTeams={teams} />
      {tournaments ? <TournamentList tournaments={tournaments} /> : null}
    </>
  );
};

export default TournamentRoute;
