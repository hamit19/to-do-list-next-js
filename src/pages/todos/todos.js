import TodoCard from "@/components/todo-card";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import useSwr, { useSWRConfig } from "swr";

axios.defaults.baseURL = "http://localhost:3000/api";

const fetcher = async () => {
  const { data } = await axios.get("/todo");
  return data;
};

// delete todo function
const handleDelete = async (id, mutate) => {
  const { data } = await axios.delete(`/todo/${id}`);

  toast(data.message, {
    hideProgressBar: false,
    autoClose: 2000,
    type: "success",
    position: "top-center",
  });

  mutate("api/todo");
};

const handleEdit = async (todo, mutate) => {
  try {
    const { data } = await axios.patch(`/todo/${todo._id}`, {
      ...todo,
      completed: !todo.completed,
    });
    // toast(data.message, {
    //   hideProgressBar: false,
    //   autoClose: 2000,
    //   type: "success",
    //   position: "top-center",
    // });
    mutate("api/todo");
    return data;
  } catch (error) {
    console.log(error);
  }
};

const Todos = () => {
  const { mutate } = useSWRConfig();
  const { data, error } = useSwr("api/todo", fetcher);

  if (error) return <h3>Some error occurred! Please refresh the page</h3>;

  if (!data) return <h3>Loading...</h3>;

  const renderTodoList = () => {
    return data?.map((todo) => (
      <TodoCard
        handleDelete={handleDelete}
        mutate={mutate}
        handleEdit={handleEdit}
        todo={todo}
        key={todo._id}
      />
    ));
  };

  return (
    <div>
      {" "}
      {data.length <= 0 ? (
        <p>
          {" "}
          There is no todo list available yet, you can make a new one by
          clicking on the above button!{" "}
        </p>
      ) : (
        renderTodoList()
      )}
    </div>
  );
};

export default Todos;
