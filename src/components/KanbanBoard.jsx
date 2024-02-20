import React, { useEffect } from "react";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Column from "./Column";
import todoIcon from "../assets/ToDoIcon.svg";
import doingIcon from "../assets/DoingIcon.svg";
import doneIcon from "../assets/DoneIcon.svg";
import { getTasksByUserId } from "../api";
import axios from "axios";

function KanbanBoard({ searchQuery }) {
  const userId = localStorage.getItem("userid");
  const queryClient = useQueryClient();

  const { data: tasks, isLoading } = useQuery({
    queryFn: () => getTasksByUserId(userId),
    queryKey: ["tasks"],
  });

  const [todo, setTodo] = useState([]);
  const [doing, setDoing] = useState([]);
  const [done, setDone] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!isLoading) {
      const filteredTodo = tasks?.filter(
        (task) =>
          task.status === "todo" &&
          task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const filteredDoing = tasks?.filter(
        (task) =>
          task.status === "doing" &&
          task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const filteredDone = tasks?.filter(
        (task) =>
          task.status === "done" &&
          task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setTodo(filteredTodo);
      setDoing(filteredDoing);
      setDone(filteredDone);
    }
  }, [tasks, isLoading, searchQuery]);

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    const status = destination.droppableId;

    if (!destination || source.droppableId == destination.droppableId) return;

    const id = draggableId;

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/Tasks/Status/${id}`,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await queryClient.invalidateQueries("tasks");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex justify-between items-start flex-row">
        <Column
          icon={todoIcon}
          title={"To Do"}
          tasks={todo}
          id={"todo"}
          searchQuery={searchQuery}
        />
        <Column
          icon={doingIcon}
          title={"Doing"}
          tasks={doing}
          id={"doing"}
          searchQuery={searchQuery}
        />
        <Column
          icon={doneIcon}
          title={"Done"}
          tasks={done}
          id={"done"}
          searchQuery={searchQuery}
        />
      </div>
    </DragDropContext>
  );
}

export default KanbanBoard;
