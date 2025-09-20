
import { useEffect, useState } from 'react';
import api from '../api/axios';
import CreateTask from '../components/CreateTask';
import CreateCategory from '../components/CreateCategory';
import Task from '../components/Task';
import Category from '../components/Category';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksRes, categoriesRes] = await Promise.all([
          api.get('/tasks'),
          api.get('/categories'),
        ]);
        setTasks(tasksRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
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
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <h2>Categories</h2>
          <CreateCategory onCategoryCreated={handleCategoryCreated} />
          <ul className="list-group mt-3">
            {categories.map((category) => (
              <Category
                key={category._id}
                category={category}
                onCategoryDeleted={handleCategoryDeleted}
                onCategoryUpdated={handleCategoryUpdated}
              />
            ))}
          </ul>
        </div>
        <div className="col-md-8">
          <h2>Tasks</h2>
          <CreateTask
            categories={categories}
            onTaskCreated={handleTaskCreated}
          />
          <div className="mt-3">
            {tasks.map((task) => (
              <Task
                key={task._id}
                task={task}
                onTaskDeleted={handleTaskDeleted}
                onTaskUpdated={handleTaskUpdated}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
