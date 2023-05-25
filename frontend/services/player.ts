import axios from "axios";

import { API_BASE_URL } from "./apiConfig";

export async function uploadExcel(formData: FormData) {
  const url = `${API_BASE_URL}/api/player/excel/`;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    }
  };

  const response = await axios.post(url, formData, config);
  return response.data;
}