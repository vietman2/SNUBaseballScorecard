import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "./apiConfig";

export async function login(phonenumber: string, password: string) {
  const url = `${API_BASE_URL}/account/login/`;

  try {
    const response = await axios.post(url, {
      phonenumber,
      password,
    });

    // Store the JWT tokens in AsyncStorage
    await AsyncStorage.setItem("access", response.data.access);
    await AsyncStorage.setItem("refresh", response.data.refresh);

    return response.data;
  } catch (error: any) {
    return error.response;
  }
}

export async function getUserInfo(phonenumber: string) {
  //TODO: get user info from backend

  return phonenumber;
}
