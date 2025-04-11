import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import TodoForm from './pages/TodoForm.jsx'
import Todolist from './pages/Todolist.jsx'
import { Routes, Route, Link } from "react-router-dom";
import Login from './pages/LoginPage.jsx'
import TodoEdit from './pages/TodoEdit.jsx'
import Signup from './pages/Signup.jsx'
import HomePage from './pages/HomePage.jsx'
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/add" element={<TodoForm />} />
        <Route path="/todolist" element={<Todolist />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/updateTask/:taskId" element={<TodoEdit />} />
      </Routes>
    </div>
  );
}


export default App