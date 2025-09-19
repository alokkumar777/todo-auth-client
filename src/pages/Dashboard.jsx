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
    <div>
      <h1>Dashboard</h1>

      <h2>Add Category</h2>
      <CategoryForm onAdd={handleAddCategory} />

      <h2>Add Task</h2>
      <TaskForm categories={categories} onAdd={handleAddTask} />

      <h2>Tasks</h2>
      <ul>
        {tasks.map((t) => (
          <li key={t._id}>
            <span
              style={{ textDecoration: t.completed ? "line-through" : "none" }}
            >
              {t.title}
            </span>
            {" - "}
            {t.categoryId?.name}

            <button onClick={() => toggleComplete(t)}>✓</button>
            <button onClick={() => deleteTask(t._id)}>🗑️</button>
          </li>
        ))}
      </ul>

      <h2>Categories</h2>
      <ul>
        {categories.map((c) => (
          <li key={c._id}>
            {c.name}
            <button onClick={() => editCategory(c)}>✏️</button>
            <button onClick={() => deleteCategory(c._id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
