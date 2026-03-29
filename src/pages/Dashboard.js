import React, { useEffect, useState } from "react";
import { getTasks, getTaskStats } from "../services/taskService";
import { logoutUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import TaskForm from "../Components/TaskForm";
import TaskList from "../Components/TaskList";
import SearchBar from "../Components/SearchBar";

function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, in_progress: 0, completed: 0 });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const fetchTasks = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;

      const res = await getTasks(params);
      setTasks(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const fetchStats = async () => {
    try {
      const res = await getTaskStats();
      setStats(res.data.data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await logoutUser(refreshToken);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchTasks(), fetchStats()]);
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [search, statusFilter]);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <div className="bg-primary text-white py-3 shadow-sm">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 mb-0">📋 Task Manager</h1>
              <p className="mb-0 opacity-75">
                {user ? `Welcome back, ${user.username}!` : "Welcome!"}
              </p>
            </div>
            <button
              className="btn btn-outline-light"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container py-4">
        {/* Statistics Cards */}
        <div className="row mb-4">
          <div className="col-md-3 mb-3">
            <div className="card border-0 shadow-sm bg-info text-white">
              <div className="card-body text-center">
                <h2 className="mb-1">{stats.total}</h2>
                <p className="mb-0">Total Tasks</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card border-0 shadow-sm bg-secondary text-white">
              <div className="card-body text-center">
                <h2 className="mb-1">{stats.pending}</h2>
                <p className="mb-0">Pending</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card border-0 shadow-sm bg-warning text-white">
              <div className="card-body text-center">
                <h2 className="mb-1">{stats.in_progress}</h2>
                <p className="mb-0">In Progress</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card border-0 shadow-sm bg-success text-white">
              <div className="card-body text-center">
                <h2 className="mb-1">{stats.completed}</h2>
                <p className="mb-0">Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="row mb-4">
          <div className="col-md-8">
            <SearchBar search={search} setSearch={setSearch} />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Task Form */}
        <TaskForm fetchTasks={fetchTasks} fetchStats={fetchStats} />

        {/* Task List */}
        <TaskList
          tasks={tasks}
          fetchTasks={fetchTasks}
          fetchStats={fetchStats}
        />

        {/* Empty State */}
        {tasks.length === 0 && (
          <div className="text-center py-5">
            <div className="mb-4">
              <span style={{ fontSize: "4rem" }}>📝</span>
            </div>
            <h4 className="text-muted">No tasks found</h4>
            <p className="text-muted">
              {search || statusFilter
                ? "Try adjusting your search or filter criteria"
                : "Start by adding your first task above!"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;