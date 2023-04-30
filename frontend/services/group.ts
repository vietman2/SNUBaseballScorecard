import axios from "axios";

import { API_BASE_URL } from "./apiConfig";

export async function fetchGroups(tournament: string) {
  tournament = tournament.replace(" ", "-");
  const url = `${API_BASE_URL}/group/${tournament}/`;
  const response = await axios.get(url);
  return response.data;
}
