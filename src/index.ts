import { Elysia, t } from "elysia";
import { client } from "./models/client";
import {html} from "@elysiajs/html";
import { createTodo, deleteTodo, getTodos } from "./controllers/noteController";
import { bodySchema } from "./types/entity";

const app = new Elysia()
.use(html())
.get("/notes", getTodos)
.post("/notes", createTodo, {body: bodySchema})
.delete("/notes/:id", deleteTodo)
.patch("/notes/:id", ({params,body}) => {
  const {id} = params;
  const {content} = body;

  client.query("UPDATE notes SET content = ? WHERE id = ?").run(content, id);
  const updatedNote = client.query("SELECT * FROM notes WHERE id = ?").all(id);

  return {data: updatedNote[0]};
},
{
  body: t.Object(
    {content: t.String()}
  )
})
.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
