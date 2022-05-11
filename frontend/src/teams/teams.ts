export interface Player {
  name: string;
  id: string;
  surname: string;
  position: string;
}
export interface Team {
  name: string;
  city: string;
  coach: string;
  players: Player[];
  id: string;
}
