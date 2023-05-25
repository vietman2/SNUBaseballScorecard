export type TeamType = {
  id: number;
  team: string;
  tournament_id: number;
  group_id: number;
  captain_Name: string;
  captain_PhoneNumber: string;
  nickname: string;
  num_players: number | null;
  initial_registration: boolean;
};

export type GroupType = {
  id: number;
  name: string;
  tournament_id: number;
};