import axios from "axios";

const API_URL = "http://localhost:8000";

export interface Cat {
  id: number;
  name: string;
  years_of_experience: number;
  breed: string;
  salary: number;
}

export const getCats = async () => {
    console.log("where")
  const response = await axios.get(`${API_URL}/cats/`);
  console.log(response.data)
  return response.data;
};

export const createCat = async (cat: {
  name: string;
  years_of_experience: number;
  breed: string;
  salary: number;
}) => {
    console.log("try")
  const response = await axios.post(`${API_URL}/cats/`, cat);
  console.log(response.data)
  return response.data;
};

export const updateCatSalary = async (id: number, salary: number) => {
  try {
    const response = await axios.put(`${API_URL}/cats/${id}/salary`, { salary });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || "Failed to update salary");
  }
};

export const deleteCat = async (id: number) => {
  await axios.delete(`${API_URL}/cats/${id}`);
};