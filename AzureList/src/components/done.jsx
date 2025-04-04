import React from "react";
import { useTaskContext } from "../components/taskContext";

export default function Done() {
  const { doneTasks } = useTaskContext();

  return (
    <div className="w-[383px] max-lg:w-[383px] max-sm:w-[200px] transition-all duration-200 h-[700px] mt-10 bg-taskHolder rounded-[16px] px-[25px] shadow-md hover:shadow-xl hover:scale-[1.01]">
      <div className="font-semibold flex text-[48px] border-b-[2.5px] border-Primary w-full pb-2 text-Primary transition-colors duration-200 ">
        Done
      </div>

      <div className="mt-4 space-y-2">
        {doneTasks.map((task, index) => (
          <div
            key={index}
            className={`bg-${task.color} text-white p-2 rounded bg-gray-700`}
          >
            {task.name}
          </div>
        ))}
      </div>
    </div>
  );
}
