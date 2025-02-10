import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

interface TokenDto {
    token: string;
    expiryDate: string;
  }

export const register = async (name: string, email: string, password: string) => {
  const response = await axios.post(`${API_URL}/user`, { name, email, password });
  return response.data;
};

export const login = async (email: string, password: string): Promise<TokenDto> => {
  const response = await axios.post(`${API_URL}/user/login`, { email, password });
  return response.data;
};