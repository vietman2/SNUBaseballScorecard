export type TeamType = {
  id: number;
  team_id: string;
  tournament_id: number;
  group_id: number;
  captain_Name: string;
  captain_PhoneNumber: string;
  nickname: string;
};

export type GroupType = {
  id: number;
  name: string;
  tournament_id: number;
};