import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdCheck } from "react-icons/md";
import { toast } from "react-toastify";
import { deleteTask, editTaskTitle } from "../api";

function Task({ task, index, searchQuery }) {
  const queryClient = useQueryClient();

  const [editingTitle, setEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const { mutateAsync: deleteTaskAsync, isPending } = useMutation({
    mutationFn: deleteTask,
    onSuccess: async () => {
      toast.success("Task deleted successfully.");
      await queryClient.invalidateQueries("tasks");
    },
    onError: () => {
      toast.error("Failed to delete task.");
    },
  });

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleEditTitle = async () => {
    await editTaskTitle(task.taskId, { title: newTitle });
    setEditingTitle(false);
    await queryClient.invalidateQueries("tasks");
  };

  const highlightTitle = (title) => {
    if (!searchQuery) return title;
    const regex = new RegExp(`(${searchQuery})`, "gi");
    const parts = title.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span className="bg-[#6E4C85] text-white" key={index}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const dueDate = task.dueDate;

  // Parse the string into a Date object
  const parsedDate = new Date(dueDate);

  // Extract the date components
  const year = parsedDate.getFullYear();
  const month = parsedDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = parsedDate.getDate();

  // Format the date as desired (e.g., YYYY-MM-DD)
  const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;

  return (
    <Draggable draggableId={`${task.taskId}`} key={task.taskId} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isdragging={snapshot.isdragging}
            className="bg-white rounded-[6px] shadow-md p-4 relative"
          >
            <div className="group absolute top-3 right-2 text-xl cursor-pointer  rounded-full p-2">
              {editingTitle ? (
                <MdCheck className="text-green-500" onClick={handleEditTitle} />
              ) : (
                <MdEdit
                  className="text-[#6E4C85]"
                  onClick={() => setEditingTitle(true)}
                />
              )}
            </div>
            <div className="absolute bottom-3 right-3 text-xl cursor-pointer text-red-500">
              <MdDelete onClick={() => deleteTaskAsync(task.taskId)} />
            </div>
            <div className="mb-4 text-lg font-bold">
              {/* {highlightTitle(task.title)} */}
              {editingTitle ? (
                <input
                  type="text"
                  value={newTitle}
                  onChange={handleTitleChange}
                  onBlur={handleEditTitle}
                  className="outline-none border-b border-gray-300"
                />
              ) : (
                highlightTitle(task.title)
              )}
            </div>
            <div className="flex gap-[6rem] mb-4">
              <div className="text-[#6C757D]">Category</div>
              {!task.category ? <div>None</div> : <div>{task.category}</div>}
            </div>
            <div className="flex gap-[6rem] mb-4">
              <div className="text-[#6C757D]">Due Date</div>
              {!formattedDate ? <div>None</div> : <div>{formattedDate}</div>}
            </div>
            <div className="flex gap-[6.5rem] mb-4">
              <div className="text-[#6C757D]">Estimate</div>
              {!task.estimate ? <div>None</div> : <div>{task.estimate}</div>}
            </div>
            <div className="flex gap-[5.2rem] mb-4">
              <div className="text-[#6C757D]">Importance</div>
              {!task.importance ? (
                <div
                  className={`py-1 px-3 rounded-[6px] text-black ${(() => {
                    switch (task.importance) {
                      case "medium":
                        return "bg-[#FE913E]";
                      case "low":
                        return "bg-[#39AC95]";
                      case "high":
                        return "bg-[#DC3545]";
                      default:
                        return "";
                    }
                  })()}`}
                >
                  None
                </div>
              ) : (
                <div
                  className={`py-1 px-3 rounded-[6px] text-white ${(() => {
                    switch (task.importance) {
                      case "medium":
                        return "bg-[#FE913E]";
                      case "low":
                        return "bg-[#39AC95]";
                      case "high":
                        return "bg-[#DC3545]";
                      default:
                        return "";
                    }
                  })()}`}
                >
                  {task.importance}
                </div>
              )}
            </div>
            {provided.placeholder}
          </div>
        );
      }}
    </Draggable>
  );
}

export default Task;
