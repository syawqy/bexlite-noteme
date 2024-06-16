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

  return <>
            <form id="noteForm" hx-post="/notes" hx-target="#notes" hx-swap="beforeend" hx-swap-oob="true">
                  <textarea name="content"></textarea>
                  <button>Create Note</button>
            </form>
            <main>
              <div>{lastData[0].content}</div>
              <button hx-delete={`/notes/${lastData[0].id}`} hx-target="closest main">Delete</button>
            </main>
          </>
}

export function deleteTodo({params} : Context) {
  const{id} = params;

  client.query("DELETE FROM notes where id = ?").run(id);

  return null;
}