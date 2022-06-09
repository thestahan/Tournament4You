export type Player = {
  name: string;
  id: number;
  surname: string;
  position: string;
};

export type NewPlayer = { name: string; surname: string; positionId: any };

export type Position = { name: string; id: number; abbreviation: string };
