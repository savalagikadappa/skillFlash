import React, { useState } from 'react';
// Tailwind styling applied
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
            <div className="max-w-3xl mx-auto px-4 pb-16">
                <div className="card space-y-6 mt-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Post a Task</h1>
                        <p className="text-sm text-gray-400">Describe your task and get matched instantly.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-xs uppercase tracking-wide text-gray-400" htmlFor="problemTitle">Task Title</label>
                            <input id="problemTitle" name="problemTitle" value={formData.problemTitle} onChange={handleChange} required className="w-full rounded-md bg-surface border border-white/10 focus:border-accent focus:ring-accent px-3 py-2 text-sm" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs uppercase tracking-wide text-gray-400" htmlFor="problemDescription">Description</label>
                            <textarea id="problemDescription" name="problemDescription" value={formData.problemDescription} onChange={handleChange} required rows={5} className="w-full resize-y rounded-md bg-surface border border-white/10 focus:border-accent focus:ring-accent px-3 py-2 text-sm" />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-xs uppercase tracking-wide text-gray-400" htmlFor="budget">Budget ($)</label>
                                <input type="number" id="budget" name="budget" value={formData.budget} onChange={handleChange} required className="w-full rounded-md bg-surface border border-white/10 focus:border-accent focus:ring-accent px-3 py-2 text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs uppercase tracking-wide text-gray-400" htmlFor="deadline">Deadline</label>
                                <input type="date" id="deadline" name="deadline" value={formData.deadline} onChange={handleChange} required className="w-full rounded-md bg-surface border border-white/10 focus:border-accent focus:ring-accent px-3 py-2 text-sm" />
                            </div>
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        {success && <p className="text-sm text-emerald-400">{success}</p>}
                        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed">{loading ? 'Submitting...' : 'Add Task'}</button>
                    </form>
                </div>
            </div>
        );
};

export default PostTask;
