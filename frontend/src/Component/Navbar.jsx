import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  // Check authentication status on mount and when localStorage changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    navigate("/login");
  };

  return (
    <div className="flex items-center h-12 bg-amber-400 px-9">
      <h1 className="w-6/12 text-2xl">Intern Link</h1>
      <div className="w-6/12 flex justify-between items-center">
        <Link to="/">Home</Link>

        {!isAuth && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {isAuth && (
          <>
            <Link to="/profile">Profile</Link>
            <button
              onClick={handleLogout}
              className="text-red-700 hover:text-red-900 font-semibold"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
