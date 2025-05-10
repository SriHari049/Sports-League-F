// services/api.js or services/auth.js

const BASE_URL = 'http://localhost:8081/users/'; // Update as needed

export const loginUser = async ({ username, password }) => {
  try {
    const response = await fetch(`${BASE_URL}/users/sigin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();

    // Example response: { token: '...', user: { name, username, role } }
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    return { success: true, user: data.user, token: data.token };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const signupUser = async ({ name, username, password }) => {
  try {
    const response = await fetch(`${BASE_URL}/users/insert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, username, password }),
    });

    const responseText = await response.text();

    if (response.ok) {
      try {
        const jsonData = JSON.parse(responseText);
        return { success: true, data: jsonData };
      } catch {
        return { success: true, message: 'Registration successful, but response not in JSON.' };
      }
    } else {
      const errorData = JSON.parse(responseText);
      return { success: false, message: errorData.message || 'Registration failed.' };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
