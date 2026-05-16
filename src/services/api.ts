import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
export const api = axios.create({
	baseURL: API_URL,
	timeout: 10000,
});