import React from "react";

const TaskCard = ({ task, onSelect }) => {
    return (
        <button onClick={() => onSelect(task)} className="text-left w-full relative group overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/70 to-gray-800/40 border border-white/10 hover:border-blue-500/50 p-6 flex flex-col gap-4 transition shadow-sm hover:shadow-blue-900/30 focus:outline-none focus:ring-2 focus:ring-blue-500/40">
            <div className="flex items-start justify-between gap-6">
                <h3 className="font-semibold text-xl text-white leading-snug pr-2 group-hover:text-blue-400 transition-colors line-clamp-2">{task.problemTitle}</h3>
                <span className="shrink-0 rounded-full bg-blue-600/10 text-blue-400 text-xs px-2 py-1 font-semibold">${task.budget}</span>
            </div>
            <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">{task.problemDescription}</p>
            <div className="flex items-center justify-between mt-auto pt-2 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>{new Date(task.deadline).toLocaleDateString()}</span>
                <span className="text-gray-400 truncate max-w-[10rem]">{task.user?.email || 'Unknown'}</span>
            </div>
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-blue-600/5 to-transparent" />
        </button>
    );
};

export default TaskCard;
