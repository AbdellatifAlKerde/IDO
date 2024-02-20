import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

function Column({ title, icon, tasks, id, searchQuery }) {
  return (
    <div className="flex flex-col gap-6 w-[422px] h-[540px] bg-white overflow-y-scroll no-scrollbar relative rounded-[6px]">
      <div className="flex justify-start items-center bg-white px-4 py-2 rounded-[6px] shadow-md sticky top-0 z-10">
        <div>
          <img src={icon} alt="burger icon" />
        </div>
        <h2 className="text-xl font-bold ml-4">{title}</h2>
      </div>

      <Droppable droppableId={id}>
        {(provided, snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              isdraggingover={snapshot.isdraggingover}
              className="flex flex-col gap-6 p-4 transition ease duration-200 bg-white flex-grow-1 min-h-[213px]"
            >
              {!tasks ? (
                <p>Loading...</p>
              ) : (
                tasks.map((task, index) => (
                  <Task
                    key={index}
                    index={index}
                    task={task}
                    searchQuery={searchQuery}
                  />
                ))
              )}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}

export default Column;
