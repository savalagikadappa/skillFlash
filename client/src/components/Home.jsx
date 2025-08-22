import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
// Tailwind-based styling now

const Home = () => {
  const steps = [
    { title: "Post Your Task", desc: "Describe your job and set a budget", icon: "📝" },
    { title: "Instant Match", desc: "SkillFlash assigns the best freelancer", icon: "🤝" },
    { title: "Work Gets Done", desc: "Freelancer completes and submits the work", icon: "⚙️" },
    { title: "Approve & Pay", desc: "Review, approve, and payment is released", icon: "💸" }
  ];
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const gotoFreelance = () => {
    if (isLoggedIn) navigate("/freelancer");
    else navigate("/login");
  };

  const postTask = () => {
    if (isLoggedIn) navigate("/post-task");
    else navigate("/login");
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      <section className="pt-8 sm:pt-4">
        <div className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">SkillFlash</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">Instant talent. Instant results. Post, match, deliver.</p>
          {!isLoggedIn && (
            <div>
              <button onClick={() => navigate('/login')} className="btn-primary">Login / Signup</button>
            </div>
          )}
        </div>
      </section>
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Get Work Done Instantly</h2>
          <p className="text-gray-400 leading-relaxed">Post a task, get matched instantly, and receive high-quality work – fast and hassle-free.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={postTask} className="btn-primary flex-1">Post a Task</button>
            <button onClick={gotoFreelance} className="btn-secondary flex-1">Earn as Freelancer</button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {steps.slice(0,4).map((s,i)=>(
            <div key={i} className="card text-center">
              <div className="text-3xl mb-2">{s.icon}</div>
              <h3 className="font-semibold text-white mb-1">{s.title}</h3>
              <p className="text-xs text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="space-y-10">
        <h2 className="text-3xl font-bold text-white text-center">How It Works</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="card group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{step.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-white">{step.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;