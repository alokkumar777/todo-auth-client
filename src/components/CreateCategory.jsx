import { useState } from "react";
import api from "../api/axios";

const CreateCategory = ({ onCategoryCreated }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/categories", { name });
      onCategoryCreated(res.data);
      setName("");
    } catch (error) {
      console.error("Failed to create category", error);
      alert("Failed to create category");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4">
      <input
        type="text"
        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="New category"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition"
        type="submit"
      >
        Create
      </button>
    </form>
  );
};

export default CreateCategory;
