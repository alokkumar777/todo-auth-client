import { useEffect, useState } from "react";
import api from "../api/axios";
import TaskForm from "../components/TaskForm";
import CategoryForm from "../components/CategoryForm";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const resTasks = await api.get("/tasks");
      const resCategories = await api.get("/categories");
      setTasks(resTasks.data);
      setCategories(resCategories.data);
    } catch (err) {
      console.error(err);
    }
  }

  // handlers for tasks
  async function toggleComplete(task) {
    try {
      const res = await api.put(`/tasks/${task._id}`, {
        completed: !task.completed,
      });
      setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteTask(id) {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  // handlers for categories
  async function editCategory(category) {
    const newName = prompt("New name:", category.name);
    if (!newName) return;

    try {
      const res = await api.put(`/categories/${category._id}`, {
        name: newName,
      });
      setCategories(
        categories.map((c) => (c._id === category._id ? res.data : c))
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteCategory(id) {
    try {
      await api.delete(`/categories/${id}`);
      setCategories(categories.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  // Add category locally
  const handleAddCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  // Add task locally
  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="w-100" style={{ maxWidth: "600px" }}>
        <h1 className="italic">Dashboard</h1>

        <div className="card mb-4">
          <div className="card-body">
            <h2 className="card-title h5 mb-3">Add Category</h2>
            <CategoryForm onAdd={handleAddCategory} />
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <h2 className="card-title h5 mb-3">Add Task</h2>
            <TaskForm categories={categories} onAdd={handleAddTask} />
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <h2 className="card-title h5 mb-3">Tasks</h2>
            <ul className="list-group">
              {tasks.map((t) => (
                <li
                  key={t._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span
                    style={{
                      textDecoration: t.completed ? "line-through" : "none",
                    }}
                  >
                    {t.title}
                  </span>
                  <span className="badge bg-secondary mx-2">
                    {t.categoryId?.name}
                  </span>
                  <div>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => toggleComplete(t)}
                      title="Toggle Complete"
                    >
                      ✓
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteTask(t._id)}
                      title="Delete Task"
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <h2 className="card-title h5 mb-3">Categories</h2>
            <ul className="list-group">
              {categories.map((c) => (
                <li
                  key={c._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>{c.name}</span>
                  <div>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => editCategory(c)}
                      title="Edit Category"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteCategory(c._id)}
                      title="Delete Category"
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
