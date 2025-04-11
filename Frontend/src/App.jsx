import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import TodoForm from './pages/TodoForm.jsx'
import Todolist from './pages/Todolist.jsx'
import { Routes, Route, Link } from "react-router-dom";
import Login from './pages/LoginPage.jsx'
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/add" element={<TodoForm />} />
 	<Route path="/" element={<Todolist />} />
 	<Route path="/Login" element={<Login />} />

      </Routes>
    </div>
  );
}


export default App