import axios from "axios";
import React, { useState } from "react";

const FormComponent = ({ mutate }) => {
  const [value, setValue] = useState({ title: "", description: "" });
  const [isShow, setIsShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/todo", value);
      mutate("api/todo");
    } catch (error) {
      console.log(error);
    }

    setValue({ ...value, title: "", description: "" });
  };

  const changeHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  if (!isShow) {
    return (
      <button
        onClick={() => setIsShow(true)}
        className=' w-full hover:bg-blue-600 custom-transition bg-blue-500 rounded-md p-2 text-slate-50 '
      >
        Add New Todo?!
      </button>
    );
  }

  return (
    <form
      className='w-full h-full flex flex-col gap-6'
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className='w-full  flex flex-col gap-2'>
        <label className='text-slate-500'>Title</label>
        <input
          name='title'
          className='p-2 text-slate-500 text-sm focus:border-blue-500 focus:outline-none focus:border-2 border-slate-400 rounded-md border'
          type='text'
          placeholder='Todo title...'
          onChange={(e) => changeHandler(e)}
          value={value.title}
        />
      </div>
      <div className='w-full  flex flex-col gap-2'>
        <label className='text-slate-500'>Description</label>
        <textarea
          name='description'
          className='p-2 text-slate-500 text-sm focus:border-blue-500 focus:outline-none focus:border-2 border-slate-400 rounded-md border'
          type='text'
          placeholder='Description...'
          onChange={(e) => changeHandler(e)}
          value={value.description}
        ></textarea>
      </div>
      <div className='flex gap-2 w-full '>
        <button
          onClick={() => setIsShow(false)}
          key='cancel'
          className=' w-1/2 hover:bg-blue-600 hover:text-slate-50 custom-transition border border-blue-500 rounded-md p-2 text-blue-500 '
          type='button'
        >
          Cancel
        </button>
        <button
          key='submit'
          className=' w-1/2  hover:bg-blue-600 custom-transition bg-blue-500 rounded-md p-2 text-slate-50 '
          type='submit'
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default FormComponent;
