import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import QueryError from "../components/QueryError";
import SuccessAlert from "../components/SuccessAlert";
import { Link, useParams, useNavigate } from "react-router";
import { MoveLeft } from "lucide-react";
import getNoteById from "../queryFunctions/getNoteById";
import updateNoteApiCall from "../queryFunctions/updateNote";
import { isApiStatusError } from "../utils/apiErrors";

export const ManageNote = () => {
  const [formState, setFormState] = useState({ title: "", content: "" });
  const noteId = useParams().id as string;
  const {
    data = {},
    isLoading: isNoteLoading,
    isError: isNoteError,
    error: noteError,
    isSuccess: isNoteSuccess,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => getNoteById(noteId),
    enabled: noteId !== undefined,
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: updateNoteApiCall,

    onSuccess: (data) => {
      console.log("Note created successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["notes"] }); // Invalidate the 'notes' query to refetch the notes list
    },
    onError: (error) => {
      console.error("Error creating note:", error);
      // Handle the error as needed (e.g., show an error message to the user)
    },
  });

  useEffect(() => {
    if (isNoteSuccess && data.note) {
      setFormState({ title: data.note.title, content: data.note.content });
    }
  }, [isNoteSuccess, data.note]);

  useEffect(() => {
    if (!isSuccess) return;
    const timer = setTimeout(() => {
      navigate("/");
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [isSuccess]);

  if (isNoteLoading) {
    return <div>Loading...</div>;
  }
  if (isNoteError) {
    return <QueryError error={noteError} />;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateNote = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, content } = formState;
    console.log(title, content);
    const noteData = { title: title.trim(), content: content.trim() };
    if (!noteData.title || !noteData.content) {
      alert("Title and content are required");
      return;
    }
    console.log(noteData);
    mutate({ id: noteId, noteData });
  };
  if (isNoteError && isApiStatusError(noteError, 404)) {
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
  if (isNoteError) {
    return <QueryError error={error} />;
  }
  return (
    <div className="flex justify-center items-center">
      <div className="card pt-10">
        <div className="card-header">
          <h3 className="card-title">Update Note</h3>
        </div>
        <div className="card-body">
          {isSuccess && <SuccessAlert msg="Note updated successfully!" />}
          <form onSubmit={handleCreateNote}>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
              <label className="label">Title</label>
              <input
                type="text"
                name="title"
                className="input"
                placeholder="Title"
                value={formState.title}
                onChange={handleInputChange}
              />

              <label className="label">Content</label>
              <textarea
                name="content"
                className="textarea"
                placeholder="Content"
                value={formState.content}
                onChange={handleInputChange}
              ></textarea>

              <button
                type="submit"
                className="btn btn-primary mt-4"
                disabled={isPending}
              >
                Update Note
              </button>
              {/* go back */}
              <Link to="/" className="block text-right">
                <button className="btn btn-outline mt-4">
                  <MoveLeft className="size-5 inline mr-1" /> Go Back
                </button>
              </Link>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageNote;
