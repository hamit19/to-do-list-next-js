import FormComponent from "@/components/form";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { getOneTodo } from "server/controller/todo";

const EditTodoPage = ({ todo }) => {
  const router = useRouter();

  const handleSubmit = async (e, setValue, value) => {
    e.preventDefault();

    try {
      const { data } = await axios.patch(`/todo/${todo._id}`, {
        ...todo,
        title: value.title,
        description: value.description,
      });

      if (data.data.status === 200) {
        toast("Todo edited!", {
          hideProgressBar: false,
          autoClose: 2000,
          type: "success",
          position: "top-center",
        });

        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }

    console.log(value);
  };

  return (
    <div className='container w-11/12 p-8 mx-auto mt-10 lg:w-[800px] bg-white rounded-xl'>
      <FormComponent
        handleSubmit={handleSubmit}
        todo={todo}
        cancel={() => router.push("/")}
      />
    </div>
  );
};

export default EditTodoPage;

export async function getServerSideProps(context) {
  const { todoId } = context.query;
  const { todo } = await getOneTodo(todoId);

  return {
    props: {
      todo: JSON.parse(JSON.stringify(todo)),
    },
  };
}
