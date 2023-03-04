import { deleteTodo, editTodo } from "server/controller/todo";

export default async function handle(req, res) {
  const { todoId } = req.query;
  const { method } = req;

  if (method === "DELETE") {
    const data = await deleteTodo({ todoId });

    if (data.status === 200)
      return res
        .status(200)
        .json({ data, message: "The todo was deleted successfully" });

    if (data.status === 404)
      return res.status(404).json({ data: { message: "The todo not found!" } });
  }

  if (method === "PATCH") {
    const newValue = req.body;
    console.log(newValue, "this is log!!!!!!");
    const data = await editTodo({ newValue });

    if (data.status === 200)
      return res
        .status(200)
        .json({ data, message: "Well done! you've done your Todo :)" });

    if ((data.status = 500))
      return res
        .status(500)
        .json({ message: "Some server side error occurred!" });
  }

  return res.status(404).json({ message: "the route was not found!" });
}
