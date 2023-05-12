import axios from "axios";

import { API_BASE_URL } from "./apiConfig";

export async function fetchTournaments() {
  const url = `${API_BASE_URL}/api/tournament/list/`;
  const response = await axios.get(url);
  return response.data;
}

export async function fetchTournamentNames() {
  const url = `${API_BASE_URL}/api/tournament/names/`;
  const response = await axios.get(url);
  return response.data;
}