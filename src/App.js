import React, { useEffect, useState } from "react";
import API from "./services/api";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import SearchBar from "./Components/SearchBar";

function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
    const res = await API.get("tasks/");
    setTasks(res.data.results || res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 🔍 Filter logic
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Task Manager 🚀</h1>

      <SearchBar search={search} setSearch={setSearch} />

      <TaskForm fetchTasks={fetchTasks} />

      <TaskList tasks={filteredTasks} fetchTasks={fetchTasks} />
    </div>
  );
}

export default App;