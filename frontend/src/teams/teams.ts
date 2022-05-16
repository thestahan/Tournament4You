export type Team = {
  name: string;
  city: string;
  coach: string;
  players?: Player[];
  id: number;
};

export type NewTeam = { name: string; city: string; coach: string };

export type Player = {
  name: string;
  id: string;
  surname: string;
  position: string;
};
