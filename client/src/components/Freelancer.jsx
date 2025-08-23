import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { get } from "../api";

const Freelancer = () => {
    const [tasks, setTasks] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await get('/api/tasks');
                if (data?.success) {
                    setTasks(data.tasks || []);
                } else {
                    console.error('Failed to load tasks', data?.error);
                }
            } catch (err) {
                console.error('Error fetching tasks:', err);
            }
        })();
    }, []);

        return (
            <div className="max-w-5xl mx-auto px-4 pb-40">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight"><span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">Browse Tasks</span></h1>
                        <p className="text-gray-400 text-sm mt-2">Find something that matches your skills and apply instantly.</p>
                    </div>
                </div>
                <div className="space-y-6">
                    {tasks.map((task, index) => (
                        <TaskCard key={index} task={task} onSelect={setSelected} />
                    ))}
                    {tasks.length === 0 && (
                        <div className="text-center py-24 text-gray-500 text-sm">No tasks available yet. Check back soon.</div>
                    )}
                </div>

                {/* Modal */}
                {selected && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={()=>setSelected(null)} />
                        <div className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/60 border border-white/10 shadow-2xl backdrop-blur-md">
                            <div className="flex items-start justify-between gap-6 px-8 pt-8 pb-4">
                                <h2 className="text-2xl font-bold text-white leading-snug pr-2">{selected.problemTitle}</h2>
                                <span className="shrink-0 rounded-full bg-blue-600/10 text-blue-400 text-xs px-3 py-1 font-semibold self-start">${selected.budget}</span>
                            </div>
                            <div className="px-8 pb-6 text-xs text-gray-400 flex items-center gap-4">
                                <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>{new Date(selected.deadline).toLocaleDateString()}</span>
                                <span className="truncate">Posted by: {selected.user?.email || 'Unknown'}</span>
                            </div>
                            <div className="px-8 pb-8 overflow-y-auto custom-scrollbar max-h-[45vh] text-gray-300 text-sm leading-relaxed space-y-4">
                                {selected.problemDescription.split(/\n+/).map((p,i)=>(<p key={i}>{p}</p>))}
                            </div>
                            <div className="px-8 pb-8 flex flex-col sm:flex-row gap-4">
                                <button onClick={()=>setSelected(null)} className="flex-1 px-6 py-3 rounded-xl border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 text-sm font-medium transition">Close</button>
                                <button className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-sm tracking-wide hover:from-blue-700 hover:to-cyan-700 transition shadow-md shadow-blue-900/30">Apply Now</button>
                            </div>
                            <button onClick={()=>setSelected(null)} className="absolute top-3 right-3 h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center text-lg font-semibold transition" aria-label="Close modal">×</button>
                        </div>
                    </div>
                )}
            </div>
        );
};

export default Freelancer;
