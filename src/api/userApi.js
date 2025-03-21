import axios from "axios";

const API_URL = "https://kings-backend-4diu.onrender.com/users";

// Fetch all users
export const getUsers = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

// Update user status (approve/reject)
export const updateUserStatus = async (userId, status) => {
  await axios.post(`${API_URL}/update-status`, { userId, status });
};

export const deleteUser = async (userId) => {
    await axios.delete(`${API_URL}/${userId}`);
  };