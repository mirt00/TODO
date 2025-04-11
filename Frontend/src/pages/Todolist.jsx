import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterLabel, setFilterLabel] = useState("All");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleDelete = async (taskId) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/v/deleteTask/${taskId}`);
      console.log(res.data.message);
      setTodos(todos.filter(todo => todo._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v/getTasks/${userId}`);
        setTodos(res.data.list);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [userId]);

  const filteredTodos = todos.filter(todo => {
    const statusMatch = filterStatus === "All" || todo.status === filterStatus;
    const labelMatch = filterLabel === "All" || todo.label === filterLabel;
    return statusMatch && labelMatch;
  });



  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">📋 Your Tasks</h1>

        {/* Filter Dropdown */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by label</label>
          <select
            value={filterLabel}
            onChange={(e) => setFilterLabel(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
           <option value="All">All</option>
           <option value="Home">Home</option>
              <option  value="Gym">Gym</option>
              <option value="Market">Market</option>
              <option value="Study">Study</option>
              <option value="Project">Project</option>
          </select>
        </div>

        {loading ? (
  <div className="text-center text-gray-600">Loading tasks...</div>
) : filteredTodos.length === 0 ? (
  <div className="text-center text-gray-500">No tasks found. Try a different filter!</div>
) : (
  <div className="space-y-4">
    {filteredTodos.map((todo) => (
      <div
        key={todo._id}
        className="p-4 border rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition duration-300"
      >
        <h2 className="font-semibold text-xl text-blue-700">{todo.title}</h2>
        <p className="text-gray-700 mb-2">{todo.body}</p>
        <p className="text-gray-700 mb-2 font-medium">📌 {todo.label}</p>
        <span
          className={`inline-block px-3 py-1 text-sm rounded-full font-medium ${
            todo.status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : todo.status === "In Progress"
              ? "bg-blue-100 text-blue-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {todo.status}
        </span>

        <div className="flex space-x-4 mt-4">
          <Link to={`/updateTask/${todo._id}`} className="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600">
            Edit
          </Link>
          <button onClick={() => handleDelete(todo._id)} className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
)}

      </div>
    </div>
  );
};

export default TodoList;
