import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const pairVehicle = async (code: string) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('User is not authenticated.');
  }

  const response = await axios.post(
    `${API_URL}/vehicle/pair`,
    { code },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};


export const unpairVehicle = async (code: string) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('User is not authenticated.');
  }

  const response = await axios.delete(`${API_URL}/vehicle/pair`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { code },
  });
  return response.data;
};
