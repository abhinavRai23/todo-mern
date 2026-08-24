import { useQuery } from "@tanstack/react-query";
import getNotes from "../queryFunctions/getNotes";
import NoteUI from "../components/NoteUI";
import type Note from "../types/note";
import QueryError from "../components/QueryError";

function Home() {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <QueryError error={error} />;
  }

  return (
    <div>
      <div className="text-2xl font-bold mb-4">Home</div>
      <div className="flex flex-row gap-4">
        {data.map((note: Note) => (
          <NoteUI key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}

export default Home;
