import axios from "axios";

export const RegisterAuth = async (formData) => {
  try {
    const result = await axios.post(
      "http://localhost:3000/api/auth/register",
      formData
    );
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

export const LoginAuth = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      formData
    );

    const { token } = response.data;

    // Save token to localStorage (or cookie)
    localStorage.setItem("token", token);

    console.log("Login successful:", response.data);
    return response.data;

  } catch (err) {
    console.log("Login error:", err.response?.data || err.message);
  }
};


// Auth.js or wherever you define API calls
export const getProfile = async () => {
  const token = localStorage.getItem("token"); // Make sure this is set on login

  if (!token) {
    throw new Error("No authentication token found");
  }

  const res = await fetch("http://localhost:3000/api/user/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.text();
    throw new Error(`Failed to fetch profile: ${res.status} ${errorData}`);
  }

  return res.json();
};

// Get any user's profile by user ID (public view)
export const getUserProfile = async (userId) => {
  const res = await fetch(`http://localhost:3000/api/user/profile/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.text();
    throw new Error(`Failed to fetch user profile: ${res.status} ${errorData}`);
  }

  return res.json();
};

// Update current user's profile
export const updateProfile = async (profileData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No authentication token found");
  }

  const res = await fetch("http://localhost:3000/api/user/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  if (!res.ok) {
    const errorData = await res.text();
    throw new Error(`Failed to update profile: ${res.status} ${errorData}`);
  }

  return res.json();
};



