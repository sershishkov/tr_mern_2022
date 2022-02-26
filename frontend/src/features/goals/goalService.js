import axios from 'axios';

const API_URL = '/api/goals/';

const createGoal = async (goal__Data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, goal__Data, config);

  return response.data;
};

const getUserGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const deleteGoal = async (goal__ID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}${goal__ID}`, config);

  return response.data;
};

const goalService = {
  createGoal,
  getUserGoals,
  deleteGoal,
};

export default goalService;
