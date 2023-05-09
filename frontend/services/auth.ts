import axios from 'axios';

import { API_BASE_URL } from './apiConfig';

export async function login(phonenumber: string, password: string) {
  const url = `${API_BASE_URL}/account/login/`;
  const response = await axios.post(url, { phonenumber, password });
  return response.data;
}