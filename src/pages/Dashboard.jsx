import { useEffect, useState } from "react";
import api from "../api/axios";

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

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((t) => (
          <li key={t._id}>
            {t.title} - {t.completed ? "✅" : "❌"} - {t.categoryId?.name}
          </li>
        ))}
      </ul>

      <h2>Categories</h2>
      <ul>
        {categories.map((c) => (
          <li key={c._id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
}
