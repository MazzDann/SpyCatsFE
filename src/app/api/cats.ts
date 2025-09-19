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


export const getMissions = async () => {
    try {
        const response = await axios.get(`${API_URL}/missions/`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || "Failed to fetch missions");
    }
};

export const createMission = async (mission: {
    cat_id: number | null;
    targets: { name: string; country: string; notes?: string; complete?: boolean }[];
}) => {
    try {
        const response = await axios.post(`${API_URL}/missions/`, mission);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || "Failed to create mission");
    }
};

export const assignCatToMission = async (missionId: number, catId: number) => {
    try {
        const response = await axios.put(`${API_URL}/missions/${missionId}/assign_cat`, { cat_id: catId });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || "Failed to assign cat to mission");
    }
};

export const updateTargetNotes = async (targetId: number, notes: string) => {
    try {
        const response = await axios.put(`${API_URL}/targets/${targetId}/notes`, { notes });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || "Failed to update target notes");
    }
};

export const markTargetComplete = async (targetId: number) => {
    try {
        const response = await axios.put(`${API_URL}/targets/${targetId}/complete`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || "Failed to mark target complete");
    }
};