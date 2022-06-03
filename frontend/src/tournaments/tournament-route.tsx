import { PageHeader } from "common/page-container";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tournamentAPI from "./api/tournament-api";
import teamsAPI from "teams/api/teams-api";
import TournamentForm from "./tournament-form";
import { NewTournament, Tournament } from "./tournaments";
import { Team } from "teams/teams";

type Params = {
  tournamentId: string;
};

const TournamentRoute = () => {
  const tournamentApi = tournamentAPI();
  const teamsApi = teamsAPI();
  const params = useParams<Params>();
  const [tournament, setTournament] = useState<Tournament>();
  const [teams, setTeams] = useState<Team[]>();

  useEffect(() => {
    tournamentApi
      .getTournament(parseInt(params.tournamentId))
      .then(setTournament);

    teamsApi.getTeams().then(setTeams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.tournamentId]);

  const onFormSubmit = useCallback((newTournament: NewTournament) => {
    tournamentApi.addTournament(newTournament);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageHeader>Tournaments</PageHeader>
      <TournamentForm onFormSubmit={onFormSubmit} selectableTeams={teams} />
    </>
  );
};

export default TournamentRoute;
