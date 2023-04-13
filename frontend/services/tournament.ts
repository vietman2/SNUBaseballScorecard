import axios from "axios";

import { API_BASE_URL } from "./apiConfig";

export async function fetchTournaments() {
  const url = `${API_BASE_URL}/tournament/list/`;
  console.log(url);

  const response = await axios.get(url);
  console.log(response.data);
  return response.data;
}
