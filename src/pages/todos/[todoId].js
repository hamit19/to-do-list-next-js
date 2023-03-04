import React, { useState } from "react";
import { getOneTodo } from "server/controller/todo";
import CheckedIcon from "../../assets/svgs/checked.svg";
import Trash from "../../assets/svgs/trash.svg";
import Edit from "../../assets/svgs/edit.svg";
import { handleDelete, handleEdit } from "./todos";

const todoDetails = ({ todo, mutate }) => {
  return (
    <div className='mt-8 mx-auto w-[90%] relative md:w-1/2 p-6 font-medium bg-white shadow-md rounded-xl'>
      <h2> Title: {todo.title}</h2>
      <div className='break-words'>
        description:
        {todo.description}
      </div>
      {/* <div className='pt-4 flex justify-around lg:justify-start lg:gap-6 '>
        <button
          onClick={() => handleEdit(todo, mutate)}
          className={`px-6 py-2 border custom-transition rounded-lg group  ${
            !todo.completed
              ? "border-red-500  hover:bg-red-500 "
              : "border-green-500 hover:bg-green-500 "
          }  shadow-md`}
        >
          <CheckedIcon
            className={`w-6 h-6 group-hover:text-white  ${
              !todo.completed ? "text-red-500" : "text-green-500"
            }`}
          />
        </button>

        <button
          className={`px-6 py-2 border  rounded-lg group hover:bg-indigo-500 border-indigo-300 shadow-md`}
        >
          <Edit className='w-6 h-6 text-indigo-500 group-hover:text-white custom-transition ' />
        </button>

        <button
          onClick={() => handleDelete(todo._id, mutate)}
          className={`px-6 py-2 border  rounded-lg group hover:bg-rose-500 border-rose-300 shadow-md`}
        >
          <Trash className='w-6 h-6 text-rose-500 group-hover:text-white custom-transition ' />
        </button>
      </div> */}
    </div>
  );
};

export default todoDetails;

export async function getServerSideProps(context) {
  const { query } = context;

  const { todo } = await getOneTodo(query.todoId);

  return {
    props: {
      todo: JSON.parse(JSON.stringify(todo)),
    },
  };
}
