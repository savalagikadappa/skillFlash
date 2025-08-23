import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

// Static data
const STEPS = [
  { title: "Post Your Task", desc: "Describe your job and set a budget", icon: "📝" },
  { title: "Instant Match", desc: "SkillFlash assigns the best freelancer", icon: "🤝" },
  { title: "Work Gets Done", desc: "Freelancer completes and submits the work", icon: "⚙️" },
  { title: "Approve & Pay", desc: "Review, approve, and payment is released", icon: "💸" }
];

const Home = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const gotoFreelance = () => navigate(isLoggedIn ? "/freelancer" : "/login");
  const postTask = () => navigate(isLoggedIn ? "/post-task" : "/login");
  const goLogin = () => navigate('/login');

  return (
  <div className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium mb-8">🚀 Launch Your Project in Minutes</span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">Instant Talent,</span><br />
            <span className="text-white">Instant Results</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-12">
            Connect with pre-vetted freelancers instantly. Post your project, get matched in seconds, and watch your ideas come to life faster than ever before.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button onClick={postTask} className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/30 text-lg">Start Your Project Free</button>
            <button onClick={gotoFreelance} className="px-10 py-4 border-2 border-gray-600 text-gray-300 font-semibold rounded-xl hover:border-gray-500 hover:text-white transition-all duration-300 text-lg">Earn as Freelancer</button>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div><div className="text-3xl font-bold text-blue-400">10k+</div><div className="text-gray-400 text-sm">Projects Completed</div></div>
            <div><div className="text-3xl font-bold text-cyan-400">24h</div><div className="text-gray-400 text-sm">Average Delivery</div></div>
            <div><div className="text-3xl font-bold text-blue-400">98%</div><div className="text-gray-400 text-sm">Success Rate</div></div>
            <div><div className="text-3xl font-bold text-cyan-400">5k+</div><div className="text-gray-400 text-sm">Experts</div></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Why Choose SkillFlash?</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Experience the fastest, most reliable way to get quality work done</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "⚡", title: "Lightning Fast Matching", description: "AI matches you with the perfect freelancer in under 30 seconds." },
              { icon: "🔒", title: "Secure & Protected", description: "Encryption, secure payments & milestone-based releases." },
              { icon: "🎯", title: "Quality Guaranteed", description: "Pre-vetted talent with proven track records." },
              { icon: "💬", title: "Real-time Collaboration", description: "Chat, file sharing & tracking built in." },
              { icon: "📊", title: "Transparent Pricing", description: "Know exactly what you pay with no hidden fees." },
              { icon: "🏆", title: "Expert Network", description: "Top freelancers across 200+ skills." }
            ].map((f,i)=>(
              <div key={i} className="group p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700 hover:border-blue-500/50 transition-all duration-500 hover:scale-105">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-white">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900/20 to-gray-800/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Get Work Done in 4 Steps</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">From idea to completion in record time</p>
          </div>
          <div className="grid lg:grid-cols-4 gap-8">
            {STEPS.map((s,i)=>(
              <div key={i} className="relative text-center card bg-gradient-to-br from-gray-900/40 to-gray-800/20 border border-gray-700/60">
                <div className="inline-block w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-6">{String(i+1).padStart(2,'0')}</div>
                <div className="text-5xl mb-6">{s.icon}</div>
                <h3 className="text-lg font-semibold mb-3 text-white">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                {i<STEPS.length-1 && <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-40"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Trusted by Thousands</h2>
            <p className="text-xl text-gray-400">Real users. Real outcomes.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Chen", role: "Startup Founder", content: "SkillFlash saved us months. Mobile app delivered in 2 weeks!", image: "👩‍💼" },
              { name: "Marcus Rodriguez", role: "E‑commerce Director", content: "Quality + speed exceeded expectations. Sales up 40% after redesign.", image: "👨‍💼" },
              { name: "Emily Watson", role: "Marketing Manager", content: "Found a copywriter in 5 minutes. Perfect content ahead of schedule.", image: "👩‍💻" }
            ].map((t,i)=>(
              <div key={i} className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700">
                <div className="flex mb-4">{[...Array(5)].map((_,j)=><span key={j} className="text-yellow-400 text-xl">⭐</span>)}</div>
                <p className="text-gray-300 mb-6 leading-relaxed">"{t.content}"</p>
                <div className="flex items-center">
                  <div className="text-3xl mr-4">{t.image}</div>
                  <div>
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-gray-400 text-sm">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900/20 to-gray-800/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-400">No hidden fees. Pay only when satisfied.</p>
          </div>
          <div className="max-w-md mx-auto">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-2 border-blue-500/40">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Pay Per Project</h3>
                <div className="text-4xl font-bold text-blue-400 mb-2">5%</div>
                <p className="text-gray-400 mb-6 text-sm">Flat fee on completed projects</p>
                <ul className="space-y-3 text-left mb-8 text-sm text-gray-300">
                  {['Unlimited project postings','Instant freelancer matching','Secure payment protection','24/7 customer support','Money-back guarantee'].map((i,k)=>(
                    <li key={k} className="flex items-center"><span className="text-green-400 mr-3">✓</span>{i}</li>
                  ))}
                </ul>
                <button onClick={postTask} className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105">Start For Free</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800/70">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-sm">
            <div>
              <div className="font-bold text-xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">SkillFlash</div>
              <p className="text-gray-400 mb-4">The fastest way to connect with world-class freelancers.</p>
              <div className="flex space-x-4 text-2xl">
                <span className="cursor-pointer hover:scale-110 transition-transform">📱</span>
                <span className="cursor-pointer hover:scale-110 transition-transform">🐦</span>
                <span className="cursor-pointer hover:scale-110 transition-transform">💼</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                {['Features','Pricing','Enterprise','API'].map((l,i)=><li key={i}><a href="#" className="hover:text-white transition-colors">{l}</a></li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                {['Help Center','Contact Us','Status','Community'].map((l,i)=><li key={i}><a href="#" className="hover:text-white transition-colors">{l}</a></li>)}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-xs">&copy; {new Date().getFullYear()} SkillFlash. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default Home;