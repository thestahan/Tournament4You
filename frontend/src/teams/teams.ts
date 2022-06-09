import { Player } from "players/players";

export type Team = {
  name: string;
  city: string;
  coach: string;
  players?: Player[];
  id: number;
};

export type NewTeam = { name: string; city: string; coach: string };
