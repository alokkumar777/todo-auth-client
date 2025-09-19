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
      <div className="mb-3">
        <label htmlFor="taskTitle" className="form-label">
          Task Title
        </label>
        <input
          id="taskTitle"
          className="form-control"
          placeholder="Task title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="taskDesc" className="form-label">
          Description
        </label>
        <input
          id="taskDesc"
          className="form-control"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="taskCategory" className="form-label">
          Category
        </label>
        <select
          id="taskCategory"
          className="form-select"
          value={form.categoryId}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
        >
          <option value="" disabled>
            Select category
          </option>
          <option value="">No category</option>
          {categories.length === 0 ? (
            <option disabled>No categories available</option>
          ) : (
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))
          )}
        </select>
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Add Task
      </button>
    </form>
  );
}
