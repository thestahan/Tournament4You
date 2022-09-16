import { Player } from "players/players";

export type Team = {
  name: string;
  city: string;
  coach: string;
  id: number;
};

export interface ExtendedTeam extends Team {
  players: Player[];
}

export type NewTeam = { name: string; city: string; coach: string };
