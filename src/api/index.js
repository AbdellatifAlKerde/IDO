import axios from "axios";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/Users/Login`,

      email,
      password,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to login");
  }
};

export const getTasksByUserId = async (userId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/Tasks/user/${userId}`
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get tasks");
  }
};

export const addTask = async (
  title,
  category,
  dueDate,
  estimate,
  importance,
  status,
  userId
) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/Tasks`,

      title,
      category,
      dueDate,
      estimate,
      importance,
      status,
      userId,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create task.");
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/Tasks/${taskId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete task.");
  }
};

export const editTaskStatus = async (taskId, status) => {
  console.log("Task ID:", taskId);
  console.log("Status:", status);
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/Tasks/Status/${taskId}`,

      status,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to edit status.");
  }
};

export const editTaskTitle = async (taskId, title) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/Tasks/${taskId}`,

      title,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to edit status.");
  }
};
