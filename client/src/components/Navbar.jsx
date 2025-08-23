import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import logo2 from "../assets/image.png";

// Helper for merging classes
const cx = (...cls) => cls.filter(Boolean).join(" ");

const NavBar = () => {
    const { isLoggedIn, logout, user } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Close menu on route change
    useEffect(() => { setOpen(false); }, [location.pathname]);

    // Scroll background transition
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        onScroll();
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleLogout = () => {
        logout();
        setOpen(false);
        navigate('/');
    };

    const isHome = location.pathname === '/' || location.pathname === '/home';

        const primaryLinks = [
            { to: '/', label: 'Home', match: ['/', '/home'] },
            { to: '/contact', label: 'Contact' },
        ];

    // In-page section anchors only show on home
    const homeAnchors = [
        { href: '#features', label: 'Features' },
        { href: '#how-it-works', label: 'How It Works' },
        { href: '#pricing', label: 'Pricing' },
    ];

    const linkBase = "relative px-1 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors";
    const activeUnderline = "after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:bg-gradient-to-r after:from-blue-500 after:to-cyan-500 after:rounded-full";

    return (
        <nav className={cx(
            "fixed inset-x-0 top-0 z-50 transition-colors duration-300 border-b",
            scrolled ? "backdrop-blur-md bg-black/80 border-gray-800/70" : "bg-transparent border-transparent"
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Brand */}
                        <button onClick={()=>navigate('/')} className="flex items-center gap-3 group">
                            <img src={logo2} alt="SkillFlash" className="h-9 w-9 rounded-lg shadow-glow object-cover" />
                            <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent tracking-wide group-hover:from-blue-300 group-hover:to-cyan-300 transition-colors">SkillFlash</span>
                        </button>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-10">
                        <div className="flex items-center gap-8">
                            {primaryLinks.map(l => {
                                const active = l.match ? l.match.includes(location.pathname) : location.pathname === l.to;
                                return (
                                    <Link key={l.to} to={l.to} className={cx(linkBase, active && activeUnderline)}>{l.label}</Link>
                                );
                            })}
                            {isHome && homeAnchors.map(a => (
                                <a key={a.href} href={a.href} className={cx(linkBase)}>{a.label}</a>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="hidden lg:flex items-center gap-3">
                        {!isLoggedIn && (
                            <Link to="/login" className="text-sm text-gray-300 hover:text-white transition-colors px-3 py-2">Sign In</Link>
                        )}
                        {!isLoggedIn ? (
                            <Link to="/login" className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold hover:from-blue-700 hover:to-cyan-700 transition shadow-md shadow-blue-900/30">Get Started</Link>
                        ) : (
                            <>
                                <Link to="/post-task" className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold hover:from-blue-700 hover:to-cyan-700 transition shadow-md shadow-blue-900/30">Post Task</Link>
                                <Link to="/freelancer" className="px-4 py-2 rounded-lg border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 text-sm font-medium transition">Freelancer</Link>
                                <button onClick={handleLogout} className="px-4 py-2 rounded-lg border border-red-500/50 text-red-400 hover:bg-red-600/10 hover:text-red-300 text-sm font-medium transition">Logout</button>
                            </>
                        )}
                    </div>

                    {/* Mobile toggle */}
                    <button onClick={()=>setOpen(o=>!o)} aria-label="Toggle navigation" className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-md text-gray-300 hover:text-white hover:bg-white/5 transition">
                        <span className="text-xl">{open ? '✖' : '☰'}</span>
                    </button>
                </div>
            </div>

            {/* Mobile Panel */}
            <div className={cx(
                "lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 backdrop-blur-md border-t border-gray-800/70", 
                open ? "max-h-[600px] opacity-100 bg-black/85" : "max-h-0 opacity-0"
            )}>
                <div className="px-4 pt-2 pb-6 space-y-4">
                    <div className="grid gap-2">
                        {primaryLinks.map(l => (
                            <Link key={l.to} to={l.to} className="block px-2 py-2 rounded-md text-sm text-gray-300 hover:text-white hover:bg-white/5 transition">{l.label}</Link>
                        ))}
                        {isHome && (
                            <div className="pt-2 border-t border-gray-800/70 grid gap-2">
                                {homeAnchors.map(a => (
                                    <a key={a.href} href={a.href} className="block px-2 py-2 rounded-md text-sm text-gray-300 hover:text-white hover:bg-white/5 transition">{a.label}</a>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="pt-2 border-t border-gray-800/70 flex flex-col gap-3">
                        {!isLoggedIn && <Link to="/login" className="text-sm text-gray-300 hover:text-white transition px-2">Sign In</Link>}
                        {!isLoggedIn ? (
                            <Link to="/login" className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold text-center hover:from-blue-700 hover:to-cyan-700 transition">Get Started</Link>
                        ) : (
                            <>
                                <Link to="/post-task" className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold text-center hover:from-blue-700 hover:to-cyan-700 transition">Post Task</Link>
                                <Link to="/freelancer" className="w-full px-4 py-3 rounded-lg border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 text-sm font-medium text-center transition">Freelancer</Link>
                                <button onClick={handleLogout} className="w-full px-4 py-3 rounded-lg border border-red-500/50 text-red-400 hover:bg-red-600/10 hover:text-red-300 text-sm font-medium transition">Logout</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;