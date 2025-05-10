// src/services/matches.js

import axios from 'axios';

// API endpoint to schedule a match
export const scheduleMatch = async (matchData) => {
  try {
    const response = await axios.post('https://localhost:8081/schedule', matchData, {
      headers: {
        Authorization: `Bearer ${matchData.token}` // Assuming you're using JWT
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to schedule the match.');
  }
};
