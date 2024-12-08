import axios from 'axios';

const API_URL = 'http://localhost:5000/api/cars';

export const getCars = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getCarById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const addCar = async (carData) => {
    const response = await axios.post(API_URL, carData);
    return response.data;
};

export const updateCar = async (id, updatedData) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
};

export const deleteCar = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
