import React, { useState } from "react";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

export default function TodoForm() {
    const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [label, setLabel] = useState("Home");
  const [status, setStatus] = useState("Pending"); // default status
const email = localStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(label);
    if (!title.trim() || !body.trim()) return;

    try {
      await axios.post(`http://localhost:3000/api/v/addTask/`, {
        title,
        body,
        label,
        email,
      });

      navigate("/todolist"); // Redirect to task list page after updating
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">➕ Add a New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Title</label>
            <input
              type="text"
              placeholder="Enter task title"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Description</label>
            <textarea
              placeholder="Describe the task..."
              className="w-full px-4 py-2 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Status</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">⏳ Pending</option>
              <option value="In Progress">🔄 In Progress</option>
              <option value="Completed">✅ Completed</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">label</label>
            <select 
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            >
              <option value="Home">Home</option>
              <option  value="Gym">Gym</option>
              <option value="Market">Market</option>
              <option value="Study">Study</option>
              <option value="Project">Project</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-800 transition duration-300"
          >
            ✅ Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
