import { Elysia, t } from "elysia";
import { client } from "./models/client";
import {html} from "@elysiajs/html";
import { createTodo, deleteTodo, getTodos, updateTodo, updateTodoUI } from "./controllers/noteController";
import { bodySchema } from "./types/entity";

const app = new Elysia()
.use(html())
.get("/notes", getTodos)
.post("/notes", createTodo, {body: bodySchema})
.delete("/notes/:id", deleteTodo)
.get("/notes/:id/edit", updateTodoUI)
.patch("/notes/:id", updateTodo, {body: bodySchema})
.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
