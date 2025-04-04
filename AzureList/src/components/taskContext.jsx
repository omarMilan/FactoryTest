import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [doTasks, setDoTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  const token = localStorage.getItem("token");

  // Fetch tasks on mount
  useEffect(() => {
    if (!token) return;
    axios
      .get("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const doList = res.data.filter((task) => task.status === "do");
        const doneList = res.data.filter((task) => task.status === "done");
        setDoTasks(doList);
        setDoneTasks(doneList);
      })
      .catch((err) => {
        console.error("Failed to fetch tasks", err);
      });
  }, [token]);

  // Add a new task
  const addTask = async (task) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/tasks",
        {
          name: task.name,
          color: "gray", // or leave out if backend defaults it
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setDoTasks((prev) => [
        ...prev,
        { ...task, id: res.data.id, status: "do" },
      ]);
    } catch (err) {
      console.error("Error adding task", err);
    }
  };

  // Mark task as done
  const completeTask = async (taskIndex) => {
    const task = doTasks[taskIndex];

    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${task.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDoTasks((prev) => prev.filter((_, i) => i !== taskIndex));
      setDoneTasks((prev) => [...prev, { ...task, status: "done" }]);
    } catch (err) {
      console.error("Error marking task done", err);
    }
  };

  return (
    <TaskContext.Provider value={{ doTasks, doneTasks, addTask, completeTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
