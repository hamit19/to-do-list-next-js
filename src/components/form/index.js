import axios from "axios";
import React, { useState } from "react";

const FormComponent = ({ handleSubmit, todo, cancel, edit }) => {
  const [checked, setChecked] = useState(todo?.completed);

  const [value, setValue] = useState({
    title: todo?.title,
    description: todo?.description,
  });

  const changeHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <form
      className='flex flex-col w-full h-full gap-6'
      onSubmit={(e) => handleSubmit(e, setValue, value, checked)}
    >
      <div className='flex flex-col w-full gap-2'>
        <label className='text-slate-500'>Title</label>
        <input
          name='title'
          className='p-2 text-sm border rounded-md text-slate-500 focus:border-blue-500 focus:outline-none focus:border-2 border-slate-400'
          type='text'
          placeholder={todo?.title ? "" : "Title..."}
          onChange={(e) => changeHandler(e)}
          value={value.title}
        />
      </div>
      <div className='flex flex-col w-full gap-2'>
        <label className='text-slate-500'>Description</label>
        <textarea
          name='description'
          className='p-2 text-sm border rounded-md text-slate-500 focus:border-blue-500 focus:outline-none focus:border-2 border-slate-400'
          type='text'
          placeholder={todo?.description ? "" : "Description..."}
          onChange={(e) => changeHandler(e)}
          value={value.description}
        ></textarea>
      </div>
      {edit && (
        <div className='flex items-center justify-start gap-3'>
          <input
            type='checkbox'
            name='checked'
            checked={checked}
            id='checked'
            onChange={() => setChecked(!checked)}
          />
          <label htmlFor='checked'>Is completed Todo?</label>
        </div>
      )}
      <div className='flex w-full gap-2 '>
        <button
          onClick={() => cancel()}
          key='cancel'
          className='w-1/2 p-2 text-blue-500 border border-blue-500 rounded-md hover:bg-blue-600 hover:text-slate-50 custom-transition'
          type='button'
        >
          {edit ? "Back" : "Cancel"}
        </button>
        <button
          key='submit'
          className='w-1/2 p-2 bg-blue-500 rounded-md hover:bg-blue-600 custom-transition text-slate-50'
          type='submit'
        >
          {edit ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default FormComponent;
