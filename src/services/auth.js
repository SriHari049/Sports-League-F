// Example: if you're doing login/signup
export const loginUser = async (credentials) => {
  // mock example (since no backend)
  return { name: 'Viewer', role: 'viewer', token: 'fake-token' };
};

export const signupUser = async (data) => {
  return { success: true, message: 'Registered!' };
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
