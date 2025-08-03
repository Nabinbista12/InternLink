import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../Component/Navbar";
import { RegisterAuth } from "./Auth";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    RegisterAuth(formData);
    setFormData({
      name: "",
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <Navbar />

      <div>
        <div className="h-fit w-full relative [&>input]:w-48 [&>input]:border">
          <form
            className="h-fit w-full absolute left-2/6 mt-24"
            onSubmit={handleSubmit}
          >
            <h1 className="text-3xl ml-16 mb-8">Get started with InternLink</h1>
            <div>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                className="w-72 h-8 border relative right-0"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                placeholder="Enter username"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                value={formData.email}
                placeholder="Enter email"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                placeholder="Enter your password"
                onChange={handleChange}
              />
            </div>
            <button className="mr-12">Register</button>
            <Link to="/login">Account already exist</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
