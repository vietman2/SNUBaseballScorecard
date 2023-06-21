export type TeamInfoType = {
  id: number;
  nickname: string;
  team_name: string;
  captain_Name: string;
  num_players: number;
  num_wildcards: number;
  num_elites: number;
};

export type GroupType = {
  id: number;
  name: string;
  tournament_id: number;
};

export type PlayerRegType = {
  college: string;
  department: string;
  student_id: string;
  name: string;
  status: string;
}

export type RegistrationType = {
  new_players: PlayerRegType[];
  similar_players: PlayerRegType[];
  existing_players: PlayerRegType[];
  errors: PlayerRegType[];
};

export type TournamentType = {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
}