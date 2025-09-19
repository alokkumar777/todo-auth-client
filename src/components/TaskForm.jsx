import { useState } from "react";
import api from "../api/axios";

export default function TaskForm({ categories, onAdd }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    categoryId: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    try {
      const res = await api.post("/tasks", form);
      onAdd(res.data); // update parent state
      setForm({ title: "", description: "", categoryId: "" });
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Task title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <select
        value={form.categoryId}
        onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
      >
        <option value="">No category</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}
