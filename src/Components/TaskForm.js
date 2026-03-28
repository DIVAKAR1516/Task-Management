import React, { useState } from "react";
import API from "../services/api";

function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title required");
      return;
    }

    await API.post("tasks/", { title, description });

    setTitle("");
    setDescription("");
    fetchTasks();
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h4>Add Task</h4>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="form-control mb-2"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button className="btn btn-success w-100">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;