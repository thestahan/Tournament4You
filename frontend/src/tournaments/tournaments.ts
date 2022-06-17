import { Team } from "teams/teams";

export type Tournament = {
  id: number;
  name: string;
  hasStarted: boolean;
  hasFinished: boolean;
  startDate: Date;
  endDate: Date;
  teams: { id: Team["id"]; name: Team["name"] };
  winnerTeam: {
    id: number;
    name: string;
  };
};

export type NewTournament = { name: string; teamsIds: Team["id"][] };
