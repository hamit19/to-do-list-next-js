import React from "react";
import CheckedIcon from "../../assets/svgs/checked.svg";
import Trash from "../../assets/svgs/trash.svg";
import Edit from "../../assets/svgs/edit.svg";
import Link from "next/link";

const TodoCard = ({ todo, mutate, handleDelete, handleEdit }) => {
  return (
    <div className='flex flex-row items-center justify-between w-full p-6 mt-6 bg-white border cursor-pointer rounded-xl hover:shadow-lg custom-transition border-slate-200'>
      <div>
        <Link href={`todos/${todo._id}`}>
          <h4
            className={` ${todo.completed && "line-through text-slate-500 "} `}
          >
            {todo.title}
          </h4>
        </Link>
      </div>
      <div className='flex flex-row justify-end items-center gap-2 w-[150px]  '>
        <div
          onClick={() => handleEdit(todo, mutate)}
          className='p-2 rounded-md cursor-pointer hover:bg-slate-50 custom-transition hover:shadow-md'
        >
          {todo.completed ? (
            <CheckedIcon className={"w-6 h-6 text-green-500"} />
          ) : (
            <div className='w-6 h-6 border-2 rounded-full border-slate-500'></div>
          )}
        </div>
        <div
          onClick={() => handleDelete(todo._id, mutate)}
          className='p-2 rounded-md cursor-pointer hover:bg-slate-50 custom-transition hover:shadow-md'
        >
          <Trash className='w-6 h-6 text-rose-700 ' />
        </div>
        <Link href={`edit-todo/${todo._id}`}>
          <div className='p-2 rounded-md cursor-pointer hover:bg-slate-50 custom-transition hover:shadow-md'>
            <Edit className='w-6 h-6 text-indigo-500 ' />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TodoCard;
