import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Task from "../components/Task";
import Category from "../components/Category";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksRes, categoriesRes] = await Promise.all([
          api.get("/tasks"),
          api.get("/categories"),
        ]);
        setTasks(tasksRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, []);

  const handleTaskDeleted = (taskId) => {
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  const handleCategoryDeleted = (categoryId) => {
    setCategories(categories.filter((category) => category._id !== categoryId));
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
  };

  const handleCategoryUpdated = (updatedCategory) => {
    setCategories(
      categories.map((category) =>
        category._id === updatedCategory._id ? updatedCategory : category
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Categories Section */}
        <section className="md:w-1/3 mb-8 md:mb-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Categories</h2>
            <Link
              to="/add-category"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              Add Category
            </Link>
          </div>
          <ul className="space-y-3">
            {categories.map((category) => (
              <Category
                key={category._id}
                category={category}
                onCategoryDeleted={handleCategoryDeleted}
                onCategoryUpdated={handleCategoryUpdated}
              />
            ))}
          </ul>
        </section>

        {/* Tasks Section */}
        <section className="md:w-2/3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Tasks</h2>
            <Link
              to="/add-task"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              Add Task
            </Link>
          </div>
          <div className="space-y-4">
            {tasks.map((task) => (
              <Task
                key={task._id}
                task={task}
                onTaskDeleted={handleTaskDeleted}
                onTaskUpdated={handleTaskUpdated}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
