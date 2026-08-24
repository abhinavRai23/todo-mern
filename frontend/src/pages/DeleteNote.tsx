import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import getNoteById from "../queryFunctions/getNoteById";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import callDeleteNoteApi from "../queryFunctions/deleteNote";
import QueryError from "../components/QueryError";
import SuccessAlert from "../components/SuccessAlert";
import { isApiStatusError } from "../utils/apiErrors";

function DeleteNote() {
  const noteId = useParams().id as string;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    isLoading: noteIsLoading,
    data,
    error: noteError,
    isError: noteIsError,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => getNoteById(noteId),
  });
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: callDeleteNoteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] }); // Invalidate the 'notes' query to refetch the notes list
    },
  });

  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined;
    if (isSuccess) {
      t = setTimeout(() => {
        console.log("Note deleted successfully");
        navigate("/");
      }, 3000);
    }
    return () => clearTimeout(t);
  }, [isSuccess, navigate]);

  if (noteIsLoading) {
    return <div>Loading...</div>;
  }

  if (noteIsError && isApiStatusError(noteError, 404)) {
    return (
      <div className="flex justify-center align-center w-100 mx-auto">
        <div className="card border border-accent shadow p-5 mt-10">
          <div className="text-xl font-bold text-warning">Note not found</div>
          <Link className="btn btn-primary mt-3" to="/">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center align-center">
      <div className="card mt-10 border border-accent shadow p-5">
        <h1 className="text-xl font-bold">Delete Note</h1>
        <p>Are you sure you want to delete note: {data?.note?.title}</p>
        <div className="flex justify-center gap-2 mt-3">
          <button
            className="btn btn-primary"
            onClick={() => mutate(noteId)}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
          <button
            className="btn btn-error"
            onClick={() => window.history.go(-1)}
          >
            Cancel
          </button>
        </div>
        {isError && <QueryError error={error} />}
        {isSuccess && (
          <SuccessAlert className="mt-3" msg="Note deleted successfully" />
        )}
      </div>
    </div>
  );
}

export default DeleteNote;
