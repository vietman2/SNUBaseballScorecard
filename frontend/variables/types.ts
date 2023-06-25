export type TeamInfoType = {
  captain_Name: string;
  id: number;
  initial_registration: boolean;
  nickname: string;
  num_players: number;
  team_name: string;
  //num_wildcards: number;
  //num_elites: number;
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