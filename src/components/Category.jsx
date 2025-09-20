import { useState } from "react";
import api from "../api/axios";

const Category = ({ category, onCategoryDeleted, onCategoryUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(category.name);

  const handleDelete = async () => {
    try {
      await api.delete(`/categories/${category._id}`);
      onCategoryDeleted(category._id);
    } catch (error) {
      console.error("Failed to delete category", error);
      alert("Failed to delete category");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/categories/${category._id}`, { name });
      onCategoryUpdated(res.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update category", error);
      alert("Failed to update category");
    }
  };

  return (
    <li className="flex items-center justify-between py-3 px-4 bg-white rounded shadow mb-2">
      {isEditing ? (
        <form
          onSubmit={handleUpdate}
          className="flex w-full items-center gap-2"
        >
          <input
            type="text"
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded transition"
            type="submit"
          >
            Save
          </button>
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white font-medium px-4 py-2 rounded transition"
            type="button"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <span className="font-semibold text-gray-800">{category.name}</span>
          <div className="flex space-x-2">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default Category;
