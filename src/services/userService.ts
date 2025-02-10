import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export interface UserDetailsDto {
    email: string;
    activeVehicle: ActiveVehicleDto;
}

interface ActiveVehicleDto {
    code: string;
}

export const getDetails = async (): Promise<UserDetailsDto> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('User is not authenticated.');
    }

    const response = await axios.get(
        `${API_URL}/user/details`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};