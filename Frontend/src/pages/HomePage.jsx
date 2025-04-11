import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const staticTasks = [
    { id: 1, task: "📝 Write a blog post" },
    { id: 2, task: "📚 Read 10 pages of a book" },
    { id: 3, task: "🏃‍♂️ Go for a walk" },
  ];

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">
          Welcome to ToDoList ✅
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Organize your day, boost productivity and stay focused!
        </p>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Sample Tasks</h2>
          <ul className="list-disc pl-5 text-gray-600">
            {staticTasks.map((task) => (
              <li key={task.id}>{task.task}</li>
            ))}
          </ul>
        </div>

 
      </div>
    </div>
  );
};

export default HomePage;
