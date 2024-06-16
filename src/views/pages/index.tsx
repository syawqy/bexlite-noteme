import { TemplateBase } from "../templates/templateBase";

export interface INote {
  id: number;
  content: string;
}

export const Home = ({ notes }: { notes: INote[] }) => {
  return (
    <TemplateBase>
      <div>Notes: </div>
      <form
        id="noteForm"
        hx-post="/notes"
        hx-target="#notes"
        hx-swap="beforeend"
      >
        <textarea name="content"></textarea>
        <button>Create Note</button>
      </form>
      <div id="notes">
        {notes.map((note) => {
          return (
            <main>
              <div>{note.content}</div>
              <button hx-delete={`/notes/${note.id}`} hx-target="closest main">Delete</button>
            </main>
          );
        })}
      </div>
    </TemplateBase>
  );
};
