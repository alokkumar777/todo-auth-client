import { useState } from "react";
import api from "../api/axios";

const CreateTask = ({ categories, onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/tasks", {
        title,
        description,
        categoryId: categoryId || null,
      });
      onTaskCreated(res.data);
      setTitle("");
      setDescription("");
      setCategoryId("");
    } catch (error) {
      console.error("Failed to create task", error);
      alert("Failed to create task");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto"
    >
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          className="w-full px-4 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        ></textarea>
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">None</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded shadow transition duration-200"
      >
        Create Task
      </button>
    </form>
  );
};

export default CreateTask;
