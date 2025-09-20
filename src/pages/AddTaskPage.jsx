import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import CreateTask from "../components/CreateTask";

const AddTaskPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleTaskCreated = () => {
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-3xl font-semibold mb-6 text-gray-900">Add Task</h2>
      <CreateTask categories={categories} onTaskCreated={handleTaskCreated} />
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
