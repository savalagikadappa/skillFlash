import React, { useState } from 'react';
import { post } from '../api';

const PostTask = () => {
    // API base handled via api.js

    const [formData, setFormData] = useState({
        problemTitle: '',
        problemDescription: '',
        budget: '',
        deadline: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const response = await post('/api/tasks', formData);
            if(response?.success){
                setSuccess(response.message || 'Task added successfully');
            } else {
                setError(response?.error || 'Failed to add task');
            }
            setFormData({
                problemTitle: '',
                problemDescription: '',
                budget: '',
                deadline: ''
            });
        } catch (error) {
            setError(error?.error || 'Error adding task');
        }
        setLoading(false);
    };

        return (
            <div className="relative max-w-4xl mx-auto px-4 pb-32">
                <div className="absolute -top-40 -right-40 w-[30rem] h-[30rem] bg-accent/20 blur-[140px] rounded-full opacity-30 pointer-events-none" />
                <div className="absolute -bottom-40 -left-40 w-[30rem] h-[30rem] bg-accent2/20 blur-[140px] rounded-full opacity-30 pointer-events-none" />
                <div className="relative mt-6 p-10 rounded-3xl bg-gradient-to-br from-gray-900/70 to-gray-800/40 border border-white/10 shadow-xl backdrop-blur-md space-y-10">
                    <div className="space-y-3 text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight"><span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">Post a Task</span></h1>
                        <p className="text-gray-400 text-sm max-w-lg mx-auto">Describe your task and get matched with the right freelancer instantly.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-2">
                            <label className="block text-xs font-medium tracking-wide text-gray-400 uppercase" htmlFor="problemTitle">Task Title</label>
                            <input id="problemTitle" name="problemTitle" value={formData.problemTitle} onChange={handleChange} required className="w-full rounded-lg bg-surface/70 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-sm px-4 py-3 transition" placeholder="e.g. Build a landing page" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-medium tracking-wide text-gray-400 uppercase" htmlFor="problemDescription">Description</label>
                            <textarea id="problemDescription" name="problemDescription" value={formData.problemDescription} onChange={handleChange} required rows={6} className="w-full rounded-lg bg-surface/70 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-sm px-4 py-3 transition resize-y" placeholder="Provide clear requirements, scope, deliverables..." />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="block text-xs font-medium tracking-wide text-gray-400 uppercase" htmlFor="budget">Budget ($)</label>
                                <input type="number" id="budget" name="budget" value={formData.budget} onChange={handleChange} required className="w-full rounded-lg bg-surface/70 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-sm px-4 py-3 transition" placeholder="500" />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-medium tracking-wide text-gray-400 uppercase" htmlFor="deadline">Deadline</label>
                                <input type="date" id="deadline" name="deadline" value={formData.deadline} onChange={handleChange} required className="w-full rounded-lg bg-surface/70 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-sm px-4 py-3 transition" />
                            </div>
                        </div>
                        <div className="min-h-[1.25rem] space-y-2">
                            {error && <p className="text-sm text-red-500">{error}</p>}
                            {success && <p className="text-sm text-emerald-400">{success}</p>}
                        </div>
                        <button type="submit" disabled={loading} className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-sm tracking-wide shadow-md shadow-blue-900/30 hover:from-blue-700 hover:to-cyan-700 transition disabled:opacity-60 disabled:cursor-not-allowed">
                            {loading ? 'Submitting...' : 'Publish Task'}
                        </button>
                    </form>
                </div>
            </div>
        );
};

export default PostTask;
