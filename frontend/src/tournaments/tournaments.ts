import { Team } from "teams/teams";

export type Tournament = {
  id: number;
  name: string;
  hasStarted: boolean;
  hasFinished: boolean;
  teams: { id: Team["id"]; name: Team["name"] };
};

export type NewTournament = { name: string; teams: Team["id"][] };
