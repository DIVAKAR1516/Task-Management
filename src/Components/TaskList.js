import React from "react";
import API from "../services/api";
import './TaskList.css';

function TaskList({ tasks, fetchTasks }) {

  const deleteTask = async (id) => {
    await API.delete(`tasks/${id}/`);
    fetchTasks();
  };

  const updateStatus = async (task) => {
    const newStatus =
      task.status === "pending" ? "completed" : "pending";

    await API.put(`tasks/${task.id}/`, {
      ...task,
      status: newStatus,
    });

    fetchTasks();
  };

  return (
    <div className="task-list">
  <h2>Tasks</h2>
  {tasks.map((task) => (
    <div key={task.id} className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p className="status">Status: {task.status}</p>
      <button onClick={() => updateStatus(task)}>Toggle Status</button>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  ))}
</div>
  );
}

export default TaskList;