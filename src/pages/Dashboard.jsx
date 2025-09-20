import { useEffect, useState } from "react";
import api from "../api/axios";
import CreateTask from "../components/CreateTask";
import CreateCategory from "../components/CreateCategory";
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

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleCategoryCreated = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

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
        <section className="md:w-1/3 mb-8 md:mb-0">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Categories
          </h2>
          <CreateCategory onCategoryCreated={handleCategoryCreated} />
          <ul className="mt-4 space-y-3">
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
        <section className="md:w-2/3">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Tasks</h2>
          <CreateTask
            categories={categories}
            onTaskCreated={handleTaskCreated}
          />
          <div className="mt-6 space-y-4">
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
