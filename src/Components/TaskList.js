import React from "react";
import API from "../services/api";

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

  const getBadgeColor = (status) => {
    if (status === "completed") return "success";
    if (status === "in-progress") return "warning";
    return "secondary";
  };

  return (
    <div className="row">
      {tasks.map((task) => (
        <div className="col-md-4" key={task.id}>
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">{task.title}</h5>
              <p className="card-text">{task.description}</p>

              <span className={`badge bg-${getBadgeColor(task.status)}`}>
                {task.status}
              </span>

              <div className="mt-3 d-flex justify-content-between">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => updateStatus(task)}
                >
                  Toggle
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;