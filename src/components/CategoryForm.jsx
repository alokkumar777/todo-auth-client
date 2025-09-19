import { useState } from "react";
import api from "../api/axios";

export default function CategoryForm({ onAdd }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const res = await api.post("/categories", { name });
      onAdd(res.data); // update parent state
      setName("");
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="categoryName" className="form-label">Category Name</label>
        <input
            id="categoryName"
            className="form-control mb-2"
            placeholder="New Category"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="btn btn-primary w-100">Add</button>
    </form>
);
}
