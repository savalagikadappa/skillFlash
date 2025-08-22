import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // Import AuthContext
import logo2 from "../assets/image.png";
const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isLoggedIn, logout, user } = useContext(AuthContext); // Use context

    const handleLogout = () => {
        logout(); // Call logout from context
        setMenuOpen(false); // Close menu
    };

        return (
            <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-background/80 border-b border-white/5"> 
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src={logo2} alt="SkillFlash" className="h-12 w-auto rounded-lg shadow" />
                        <span className="text-xl font-semibold tracking-wide text-white">SkillFlash</span>
                    </div>
                    <button className="lg:hidden text-gray-300 hover:text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? '✖' : '☰'}
                    </button>
                    <ul className={`lg:flex hidden items-center gap-8 text-sm font-medium`}> 
                        <li><Link className="text-gray-300 hover:text-white transition" to="/">Home</Link></li>
                        <li><Link className="text-gray-300 hover:text-white transition" to="/post-task">Post a Task</Link></li>
                        <li><Link className="text-gray-300 hover:text-white transition" to="/freelancer">Freelancer</Link></li>
                        <li><Link className="text-gray-300 hover:text-white transition" to="/contact">Contact</Link></li>
                        <li>
                            {isLoggedIn ? (
                                <button onClick={handleLogout} className="btn-secondary !py-2 !px-4">Logout</button>
                            ) : (
                                <Link to="/login"><button className="btn-primary !py-2 !px-4">Login / Signup</button></Link>
                            )}
                        </li>
                    </ul>
                </div>
                {menuOpen && (
                    <div className="lg:hidden px-4 pb-4 space-y-2 bg-surface/95 border-t border-white/5">
                        <Link onClick={() => setMenuOpen(false)} className="block py-2 text-gray-200 hover:text-white" to="/">Home</Link>
                        <Link onClick={() => setMenuOpen(false)} className="block py-2 text-gray-200 hover:text-white" to="/post-task">Post a Task</Link>
                        <Link onClick={() => setMenuOpen(false)} className="block py-2 text-gray-200 hover:text-white" to="/freelancer">Freelancer</Link>
                        <Link onClick={() => setMenuOpen(false)} className="block py-2 text-gray-200 hover:text-white" to="/contact">Contact</Link>
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className="w-full btn-secondary">Logout</button>
                        ) : (
                            <Link to="/login" className="block"><button className="w-full btn-primary">Login / Signup</button></Link>
                        )}
                    </div>
                )}
            </nav>
        );
};

export default NavBar;