const BASE_URL = 'http://localhost:8081/players/'; // Adjust your API base URL

// Fetch players from the backend
export const fetchPlayers = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch players');
    }

    const players = await response.json();
    return players;
  } catch (error) {
    console.error('Error fetching players:', error);
    throw error; // Re-throw error to be handled in the component
  }
};

// Add a new player
export const addPlayer = async (newPlayer) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newPlayer),
    });

    if (!response.ok) {
      throw new Error('Failed to add player');
    }

    const player = await response.json();
    return player; // Return the added player
  } catch (error) {
    console.error('Error adding player:', error);
    throw error; // Re-throw error to be handled in the component
  }
};
