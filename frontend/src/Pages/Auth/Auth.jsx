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
    const result = await axios.post(
      "http://localhost:3000/api/auth/login",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
