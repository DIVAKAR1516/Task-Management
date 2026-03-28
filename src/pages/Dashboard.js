import React, { useEffect, useState } from "react";
import API from "../services/api";
import TaskForm from "../Components/TaskForm";
import TaskList from "../Components/TaskList";
import SearchBar from "../Components/SearchBar";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await API.get("tasks/");
      setTasks(res.data.results || res.data);
    } catch (error) {
      console.log("Unauthorized, redirecting...");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Task Manager 🚀</h1>

      {/* Logout Button */}
      <button
        className="btn btn-danger mb-3"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>

      <SearchBar search={search} setSearch={setSearch} />

      <TaskForm fetchTasks={fetchTasks} />

      <TaskList tasks={filteredTasks} fetchTasks={fetchTasks} />
    </div>
  );
}

export default Dashboard;