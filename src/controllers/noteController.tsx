import { client } from "../models/client";
import { TBody } from "../types/entity";
import { Home, INote } from "../views/pages";
import {Context} from "elysia";

export function getTodos() {
    const allNotes = client.query("SELECT * FROM notes").all() as INote[];
  
    return <Home notes={allNotes} />
  }

export function createTodo({body} : Context){
  const {content} = body as TBody;

  client.query("INSERT INTO notes (content) VALUES (?)").run(content);

  const lastData = client.query("select * from notes order by id desc limit 1").all() as INote[];

  return (
    <>
      <form id="noteForm" hx-post="/notes" hx-target="#notes" hx-swap="beforeend" hx-swap-oob="true">
            <textarea name="content"></textarea>
            <button>Create Note</button>
      </form>
      <main id={`note-${lastData[0].id}`}>
        <div>{lastData[0].content}</div>
        <button hx-get={`/notes/${lastData[0].id}/edit`} hx-swap="none">edit</button>
        <button hx-delete={`/notes/${lastData[0].id}`} hx-target="closest main">Delete</button>
      </main>
    </>
  )
}

export function deleteTodo({params} : Context) {
  const{id} = params;

  client.query("DELETE FROM notes where id = ?").run(id);

  return null;
}

export function updateTodoUI({params}:Context){
  const{id} = params;

  const currentNote = client.query("SELECT * FROM notes WHERE id = ?").all(id) as INote[];

  return (
    <>
      <form id="noteForm" hx-patch={`/notes/${id}`} hx-target={`#note-${id}`} hx-swap="outerHTML" hx-swap-oob="true">
            <textarea name="content">{currentNote[0].content}</textarea>
            <button>Update Note</button>
      </form>
    </>
  )
}

export function updateTodo({params, body} : Context){
  const {id} = params;
  const {content} = body as INote;

  client.query("UPDATE notes SET content = ? WHERE id = ?").run(content, id);
  const updatedNote = client.query("SELECT * FROM notes WHERE id = ?").all(id) as INote[];

  return (
    <>
      <form id="noteForm" hx-post="/notes" hx-target="#notes" hx-swap="beforeend" hx-swap-oob="true">
            <textarea name="content"></textarea>
            <button>Create Note</button>
      </form>
      <main id={`note-${updatedNote[0].id}`}>
        <div>{updatedNote[0].content}</div>
        <button hx-get={`/notes/${updatedNote[0].id}/edit`} hx-swap="none">edit</button>
        <button hx-delete={`/notes/${updatedNote[0].id}`} hx-target="closest main">Delete</button>
      </main>
    </>
  )
}