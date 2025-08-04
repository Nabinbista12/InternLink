import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../../Component/Navbar";
import { RegisterAuth } from "./Auth";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    for (let key in formData) {
      if (!formData[key]) {
        alert(`${key.charAt(0).toUpperCase() + key.slice(1)} is required`);
        return;
      }
    }

    try {
      await RegisterAuth(formData);
      alert("Registration successful!");
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
      });
      navigate("/login");
    } catch (err) {
      alert("Registration failed. Try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Navbar />
      <div className="flex flex-grow overflow-hidden">
        {/* Left side with background image for large screens */}
        <div
          className="hidden lg:flex w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1549645934-8c88e7d23d91?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <div className="bg-neutral-900 bg-opacity-70 flex-grow p-8 flex items-center justify-center">
            <h2 className="text-4xl font-bold text-white text-center">
              Join InternLink
              <br />
              and find your dream internship.
            </h2>
          </div>
        </div>

        {/* Right side with the form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-neutral-800 bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 border border-neutral-700 transition-all duration-500"
          >
            <h1 className="text-4xl font-extrabold mb-6 text-white text-center">
              Create account
            </h1>

            {["name", "username", "email", "password"].map((field) => (
              <div className="relative mb-6" key={field}>
                <input
                  type={field === "password" ? "password" : "text"}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="peer w-full h-12 bg-neutral-700 text-white border-b-2 border-neutral-600 focus:outline-none focus:border-indigo-400 transition-colors duration-300 px-2 pt-5"
                />
                <label
                  htmlFor={field}
                  className="absolute left-2 top-1 text-neutral-400 text-sm transition-all duration-300 ease-in-out peer-focus:text-indigo-400 peer-focus:text-xs peer-focus:top-1"
                >
                  {field === "name"
                    ? "Full Name"
                    : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
              </div>
            ))}

            <button
              type="submit"
              className="w-full py-3 mt-6 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:from-violet-700 hover:to-indigo-700 transition-all duration-300"
            >
              Register
            </button>

            <p className="text-sm text-center text-neutral-400 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
