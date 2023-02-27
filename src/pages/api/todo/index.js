import { createTodo, getAllTodo } from "server/controller/todo";

export default async function handle(req, res) {
  const { method, body } = req;

  if (method === "GET") {
    const data = await getAllTodo();
    return res.status(200).json(data);
  }

  if (method === "POST") {
    const value = body;

    const data = await createTodo({ value });

    if (data.status === 200) return res.status(200).json(data);

    if (data.status === 500)
      return res
        .status(500)
        .json({ message: "Some server side error occurred!" });
  }

  return res.status(404).json({ message: "The rout Not Found!" });
}
