import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import Loader from "../components/Loader";

const AddTaskPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleTaskCreated = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/tasks", {
        title,
        description,
        categoryId: categoryId || null,
      });
      handleTaskCreated(res.data);
      setTitle("");
      setDescription("");
      setCategoryId("");
    } catch (error) {
      console.error("Failed to create task", error);
      alert("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-3xl font-semibold mb-6 text-gray-900">Add Task</h2>
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
      <button
        className="mt-6 px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded transition"
        onClick={() => navigate("/")}
      >
        Go Back
      </button>
    </div>
  );
};

export default AddTaskPage;
