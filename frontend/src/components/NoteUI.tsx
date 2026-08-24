import { Link } from "react-router";
import type Note from "../types/note";

function NoteUI({ note }: { note: Note }) {
  return (
    <div className="border border-primary rounded-lg p-4 mb-4 w-fit">
      <div className="text-xl font-bold">{note.title}</div>
      <div className="text-sm">{note.content}</div>

      <div className="flex justify-between items-center mt-2 gap-5">
        <div className="text-xs text-muted-foreground">
          {new Date(note.date).toLocaleDateString()}
        </div>
        <div className="flex gap-2">
          <Link to={`/edit/${note.id}`}>
            <button className="btn btn-sm btn-outline btn-primary">Edit</button>
          </Link>
          <Link to={`/delete/${note.id}`}>
            <button className="btn btn-sm btn-outline btn-error">Delete</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default NoteUI;
