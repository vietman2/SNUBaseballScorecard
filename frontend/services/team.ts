import axios from "axios";

import { API_BASE_URL } from "./apiConfig";

export async function fetchTeams(tournament: string) {
  tournament = tournament.replace(" ", "-");
  const url = `${API_BASE_URL}/api/team/${tournament}/`;
  const response = await axios.get(url);
  return response.data;
}
