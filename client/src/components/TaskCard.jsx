import React from "react";
// Tailwind styling applied

const TaskCard = ({ task }) => {
    return (
        <div className="relative group overflow-hidden rounded-xl bg-gradient-to-b from-surface to-black/40 border border-white/5 p-5 flex flex-col gap-3 hover:border-accent/60 transition">
            <div className="flex items-start justify-between gap-4">
                <h3 className="font-semibold text-lg text-white leading-snug pr-2 group-hover:text-accent transition-colors line-clamp-2">{task.problemTitle}</h3>
                <span className="shrink-0 rounded-full bg-accent/10 text-accent text-xs px-2 py-1 font-medium">${task.budget}</span>
            </div>
            <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">{task.problemDescription}</p>
            <div className="flex items-center justify-between mt-auto pt-2 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>{new Date(task.deadline).toLocaleDateString()}</span>
                <span className="text-gray-400">{task.user?.email || 'Unknown'}</span>
            </div>
            <button className="mt-3 btn-secondary w-full text-sm">Apply Now</button>
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-accent/5 to-transparent" />
        </div>
    );
};

export default TaskCard;
