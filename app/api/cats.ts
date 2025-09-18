import axios from "axios";

const API_URL = "http://localhost:8000";

export const getCats = async () => {
  const response = await axios.get(`${API_URL}/cats/`);
  return response.data;
};

export const createCat = async (cat: {
  name: string;
  years_of_experience: number;
  breed: string;
  salary: number;
}) => {
  const response = await axios.post(`${API_URL}/cats/`, cat);
  return response.data;
};

export const updateCatSalary = async (id: number, salary: number) => {
  const response = await axios.put(`${API_URL}/cats/${id}/salary`, { salary });
  return response.data;
};

export const deleteCat = async (id: number) => {
  await axios.delete(`${API_URL}/cats/${id}`);
};