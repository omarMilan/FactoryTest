import React, { useState } from "react";
import axios from "axios";
import addIcon from "../assets/addIcon.png";
import { useTaskContext } from "../components/taskContext";

export default function Do() {
  const { doTasks, addTask, completeTask } = useTaskContext();
  const [showPopup, setShowPopup] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [heldIndex, setHeldIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName) return;
    addTask({ name: taskName });
    setTaskName("");
    setShowPopup(false);
  };

  const handleMouseDown = (index) => {
    setHeldIndex(index);
    const timer = setTimeout(() => {
      setEditingIndex(index);
    }, 1500);
    doTasks[index].holdTimer = timer;
  };

  const handleMouseUp = (index) => {
    clearTimeout(doTasks[index]?.holdTimer);
    setHeldIndex(null);
  };

  const handleTouchStart = (index) => {
    handleMouseDown(index);
  };

  const handleTouchEnd = (index) => {
    handleMouseUp(index);
  };

  const handleEditChange = (e, index) => {
    doTasks[index].name = e.target.value;
  };

  const handleEditBlur = async (index) => {
    const task = doTasks[index];
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/edit/${task.id}`,
        {
          name: task.name,
          color: "gray",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("✅ Task updated");
    } catch (err) {
      console.error("❌ Failed to update:", err);
    }
    setEditingIndex(null);
    setHeldIndex(null);
  };

  const handleClick = (index) => {
    if (editingIndex === index || heldIndex === index) return;
    completeTask(index);
  };

  return (
    <div className="w-[383px] max-lg:w-[383px] max-sm:w-[200px] transition-all duration-200 h-[700px] mt-10 bg-Primary rounded-[16px] px-[25px] shadow-md hover:shadow-xl hover:scale-[1.01]">
      <div className="flex justify-between items-end border-b-[2.5px] border-white w-full pb-2">
        <span className="font-semibold text-[48px] text-white transition-colors duration-200">
          Do
        </span>
        <img
          src={addIcon}
          onClick={() => setShowPopup(true)}
          className="w-[21px] h-[21px] mb-5 cursor-pointer transition-transform duration-200 hover:scale-125 hover:rotate-12"
          alt="Add"
        />
      </div>

      <div className="mt-4 space-y-2">
        {doTasks.map((task, index) => (
          <div
            key={index}
            onMouseDown={() => handleMouseDown(index)}
            onMouseUp={() => handleMouseUp(index)}
            onTouchStart={() => handleTouchStart(index)}
            onTouchEnd={() => handleTouchEnd(index)}
            onClick={() => handleClick(index)}
            className={`p-2 rounded text-white transition-all duration-[1500ms] ease-in-out
              ${
                editingIndex === index || heldIndex === index
                  ? "bg-red-500"
                  : "bg-gray-700"
              }`}
          >
            {editingIndex === index ? (
              <input
                type="text"
                defaultValue={task.name}
                onChange={(e) => handleEditChange(e, index)}
                onBlur={() => handleEditBlur(index)}
                className="bg-transparent text-white outline-none w-full"
                autoFocus
              />
            ) : (
              <span>{task.name}</span>
            )}
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fade-in">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow-md w-[300px] space-y-4 transition-all duration-300 transform scale-100"
          >
            <h2 className="text-lg font-bold">Add New Task</h2>
            <input
              type="text"
              placeholder="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowPopup(false)}
                className="px-4 py-1 border rounded text-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
