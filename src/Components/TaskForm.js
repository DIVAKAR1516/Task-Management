import React, { useState } from "react";
import API from "../services/api";

function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    await API.post("tasks/", {
      title,
      description,
    });

    setTitle("");
    setDescription("");
    fetchTasks();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Task</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;