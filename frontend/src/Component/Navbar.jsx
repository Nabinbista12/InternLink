import { Link } from "react-router-dom";

export default function Navbar() {

    return (
        <div className="flex items-center h-12 bg-amber-400">
            <h1 className="pl-9 w-6/12 items-center text-2xl">Intern Link</h1>

            <div className="w-6/12 flex justify-between items-center pr-10">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/logout">Logout</Link>
            </div>
        </div>
    )
    
};
