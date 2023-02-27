const { default: Todo } = require("server/models/Todo");
const { default: dbConnect } = require("server/utils/dbConnect");

dbConnect();

const getAllTodo = async () => {
  const data = await Todo.find({}).sort({ created: -1 });
  return data;
};

const createTodo = async ({ value }) => {
  const { title, description } = value;

  const created = await Todo.create({ title, description });

  if (created) return { status: 200 };

  if (!created) return { status: 500 };
};

const deleteTodo = async ({ todoId }) => {
  const todoFound = await Todo.findById(todoId);

  if (todoFound) {
    const { _id } = todoFound;
    const deletedTodo = await Todo.findByIdAndDelete(_id);

    if (deletedTodo) return { status: 200 };
  }

  if (!todoFound) return { status: 404 };
};

const editTodo = async ({ newValue }) => {
  console.log(newValue, "this is newValue in controller log!!!!!");

  const foundTodo = await Todo.findById(newValue._id);

  if (foundTodo) {
    const editedTodo = await Todo.findByIdAndUpdate(foundTodo._id, newValue);

    if (editedTodo) return { status: 200 };
  }

  if (!foundTodo) return { status: 404 };
};

module.exports = {
  getAllTodo,
  createTodo,
  deleteTodo,
  editTodo,
};
