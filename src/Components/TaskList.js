import React, { useState } from "react";
import { updateTask, deleteTask } from "../services/taskService";

function TaskList({ tasks, fetchTasks, fetchStats }) {
  const [loadingStates, setLoadingStates] = useState({});
  const [editingTask, setEditingTask] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "" });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    setLoadingStates(prev => ({ ...prev, [`delete-${id}`]: true }));

    try {
      await deleteTask(id);
      await fetchTasks();
      await fetchStats();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete task");
    } finally {
      setLoadingStates(prev => ({ ...prev, [`delete-${id}`]: false }));
    }
  };

  const handleStatusUpdate = async (task) => {
    setLoadingStates(prev => ({ ...prev, [`status-${task.id}`]: true }));

    try {
      const statusFlow = {
        'pending': 'in-progress',
        'in-progress': 'completed',
        'completed': 'pending'
      };

      const newStatus = statusFlow[task.status];
      await updateTask(task.id, { ...task, status: newStatus });
      await fetchTasks();
      await fetchStats();
    } catch (error) {
      console.error("Status update error:", error);
      alert("Failed to update task status");
    } finally {
      setLoadingStates(prev => ({ ...prev, [`status-${task.id}`]: false }));
    }
  };

  const startEdit = (task) => {
    setEditingTask(task.id);
    setEditForm({ title: task.title, description: task.description });
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditForm({ title: "", description: "" });
  };

  const handleEdit = async (taskId) => {
    if (!editForm.title.trim()) {
      alert("Task title is required");
      return;
    }

    setLoadingStates(prev => ({ ...prev, [`edit-${taskId}`]: true }));

    try {
      await updateTask(taskId, editForm);
      cancelEdit();
      await fetchTasks();
    } catch (error) {
      console.error("Edit error:", error);
      alert("Failed to update task");
    } finally {
      setLoadingStates(prev => ({ ...prev, [`edit-${taskId}`]: false }));
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      'pending': { color: 'secondary', icon: '⏳', text: 'Pending' },
      'in-progress': { color: 'warning', icon: '🔄', text: 'In Progress' },
      'completed': { color: 'success', icon: '✅', text: 'Completed' }
    };

    return config[status] || config['pending'];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (tasks.length === 0) {
    return null;
  }

  return (
    <div className="row">
      {tasks.map((task) => {
        const statusBadge = getStatusBadge(task.status);
        const isEditing = editingTask === task.id;

        return (
          <div className="col-lg-4 col-md-6 mb-4" key={task.id}>
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body d-flex flex-column">
                {/* Status Badge */}
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span className={`badge bg-${statusBadge.color} bg-opacity-10 text-${statusBadge.color} px-3 py-2`}>
                    {statusBadge.icon} {statusBadge.text}
                  </span>
                  <small className="text-muted">{formatDate(task.created_at)}</small>
                </div>

                {/* Task Content */}
                {isEditing ? (
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      placeholder="Task title"
                    />
                    <textarea
                      className="form-control"
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      placeholder="Task description"
                      rows="2"
                    />
                  </div>
                ) : (
                  <div className="mb-3">
                    <h5 className="card-title mb-2">{task.title}</h5>
                    {task.description && (
                      <p className="card-text text-muted flex-grow-1">
                        {task.description}
                      </p>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-auto">
                  {isEditing ? (
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-success btn-sm flex-fill"
                        onClick={() => handleEdit(task.id)}
                        disabled={loadingStates[`edit-${task.id}`]}
                      >
                        {loadingStates[`edit-${task.id}`] ? (
                          <span className="spinner-border spinner-border-sm" role="status"></span>
                        ) : (
                          '💾 Save'
                        )}
                      </button>
                      <button
                        className="btn btn-secondary btn-sm flex-fill"
                        onClick={cancelEdit}
                        disabled={loadingStates[`edit-${task.id}`]}
                      >
                        ❌ Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-outline-primary btn-sm flex-fill"
                        onClick={() => handleStatusUpdate(task)}
                        disabled={loadingStates[`status-${task.id}`]}
                        title={`Change status from ${task.status}`}
                      >
                        {loadingStates[`status-${task.id}`] ? (
                          <span className="spinner-border spinner-border-sm" role="status"></span>
                        ) : (
                          '🔄 Status'
                        )}
                      </button>
                      <button
                        className="btn btn-outline-warning btn-sm flex-fill"
                        onClick={() => startEdit(task)}
                        disabled={loadingStates[`edit-${task.id}`]}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm flex-fill"
                        onClick={() => handleDelete(task.id)}
                        disabled={loadingStates[`delete-${task.id}`]}
                      >
                        {loadingStates[`delete-${task.id}`] ? (
                          <span className="spinner-border spinner-border-sm" role="status"></span>
                        ) : (
                          '🗑️'
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TaskList;