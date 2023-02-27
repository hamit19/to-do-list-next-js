import React from "react";
import CheckedIcon from "../../assets/svgs/checked.svg";
import Trash from "../../assets/svgs/trash.svg";
import Edit from "../../assets/svgs/edit.svg";
import axios from "axios";
import { toast } from "react-toastify";

const TodoCard = ({ todo, mutate }) => {
  // delete todo function
  const handleDelete = async (id) => {
    const { data } = await axios.delete(`api/todo/${id}`);

    toast(data.message, {
      hideProgressBar: false,
      autoClose: 2000,
      type: "success",
      position: "top-center",
    });

    mutate("api/todo");
  };

  const handleEdit = async (todo) => {
    try {
      const { data } = await axios.patch(`api/todo/${todo._id}`, {
        ...todo,
        completed: true,
      });
      toast(data.message, {
        hideProgressBar: false,
        autoClose: 2000,
        type: "success",
        position: "top-center",
      });
      mutate("api/todo");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-row items-center justify-between w-full p-6 mt-6 bg-white border rounded-xl cursor-pointer hover:shadow-lg custom-transition border-slate-200'>
      <div>
        <h4 className={` ${todo.completed && "line-through text-slate-500 "} `}>
          {todo.title}
        </h4>
      </div>
      <div className='flex flex-row justify-end items-center gap-2 w-[150px]  '>
        <div
          onClick={() => handleEdit(todo)}
          className='p-2 rounded-md cursor-pointer hover:bg-slate-50 custom-transition hover:shadow-md'
        >
          <CheckedIcon
            className={`w-6 h-6 ${
              !todo.completed ? "text-red-500" : "text-green-500"
            }`}
          />
        </div>
        <div
          onClick={() => handleDelete(todo._id)}
          className='p-2 rounded-md cursor-pointer hover:bg-slate-50 custom-transition hover:shadow-md'
        >
          <Trash className='w-6 h-6 text-rose-700 ' />
        </div>
        <div className='p-2 rounded-md cursor-pointer hover:bg-slate-50 custom-transition hover:shadow-md'>
          <Edit className='w-6 h-6 text-indigo-500 ' />
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
