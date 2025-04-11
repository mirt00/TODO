import React from 'react'
const todos = [
    {
      id: 1,
      title: "Buy groceries",
      body: "Milk, Bread, Eggs, and Fruits",
    },
    {
      id: 2,
      title: "Finish homework",
      body: "Complete math and science assignments",
    },
    {
      id: 3,
      title: "Workout",
      body: "Go for a 30-minute run in the evening",
    },
  ];
const Todolist = () => {
  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-6">
              <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">📝 Todo List</h1>
                <div className="space-y-4">
                  {todos.map((todo) => (
                    <div
                      key={todo.id}
                      className="p-4 border rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition duration-300"
                    >
                      <h2 className="font-semibold text-xl text-blue-700">{todo.title}</h2>
                      <p className="text-gray-700">{todo.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
    </div>
  )
}

export default Todolist
