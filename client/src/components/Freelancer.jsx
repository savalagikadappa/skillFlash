import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";

const apiUrl = import.meta.env.VITE_API_URL;

const Freelancer = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/tasks`);
                if(response.data.success){
                    setTasks(response.data.tasks);
                } else {
                    console.error('Failed to load tasks', response.data.error);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

        return (
            <div className="max-w-7xl mx-auto px-4 pb-24">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Browse Tasks</h1>
                        <p className="text-sm text-gray-400 mt-1">Find something that matches your skills and apply instantly.</p>
                    </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {tasks.map((task, index) => (
                        <TaskCard key={index} task={task} />
                    ))}
                    {tasks.length === 0 && (
                        <div className="col-span-full text-center py-16 text-gray-500 text-sm">No tasks available yet. Check back soon.</div>
                    )}
                </div>
            </div>
        );
};

export default Freelancer;
