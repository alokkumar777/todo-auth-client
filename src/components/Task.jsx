import { useState } from "react";
import api from "../api/axios";

const Task = ({ task, onTaskDeleted, onTaskUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/${task._id}`);
      onTaskDeleted(task._id);
    } catch (error) {
      console.error("Failed to delete task", error);
      alert("Failed to delete task");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/tasks/${task._id}`, { title, description });
      onTaskUpdated(res.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update task", error);
      alert("Failed to update task");
    }
  };

  const toggleComplete = async () => {
    try {
      const res = await api.put(`/tasks/${task._id}`, {
        completed: !task.completed,
      });
      onTaskUpdated(res.data);
    } catch (error) {
      console.error("Failed to update task", error);
      alert("Failed to update task");
    }
  };

  return (
    <div
      className={`mb-4 p-4 rounded-lg shadow ${
        task.completed ? "bg-gray-100" : "bg-white"
      }`}
    >
      {isEditing ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            ></textarea>
          </div>
          <div className="flex space-x-3">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded transition"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex justify-between items-center mb-2">
            <h5
              className={`text-lg font-semibold ${
                task.completed ? "line-through text-gray-500" : "text-gray-900"
              }`}
            >
              {task.title}
            </h5>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition"
              >
                Delete
              </button>
            </div>
          </div>
          <p
            className={`mb-3 ${
              task.completed ? "line-through text-gray-500" : "text-gray-700"
            }`}
          >
            {task.description}
          </p>
          <label className="inline-flex items-center space-x-2 text-gray-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={toggleComplete}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span>Completed</span>
          </label>
        </>
      )}
    </div>
  );
};

export default Task;
