import axios from 'axios';

import { API_BASE_URL } from './apiConfig';

export async function login(email: string, password: string) {
  const url = `${API_BASE_URL}/auth/login/`;
  const response = await axios.post(url, { email, password });
  return response.data;
}