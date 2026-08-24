import { useState } from "react";
import createNoteApiCall from "../queryFunctions/createNote";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import QueryError from "../components/QueryError";
import SuccessAlert from "../components/SuccessAlert";
import { Link } from "react-router";
import { MoveLeft } from "lucide-react";

export const CreateNote = () => {
  const [formState, setFormState] = useState({
    title: "",
    content: "",
  });
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: createNoteApiCall,
    onSuccess: (data) => {
      console.log("Note created successfully:", data);
      // Optionally, you can reset the form state or perform other actions here
      setFormState({ title: "", content: "" });
      queryClient.invalidateQueries({ queryKey: ["notes"] }); // Invalidate the 'notes' query to refetch the notes list
    },
    onError: (error) => {
      console.error("Error creating note:", error);
      // Handle the error as needed (e.g., show an error message to the user)
    },
  });

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
    const noteData = { title: title.trim(), content: content.trim() };
    if (!noteData.title || !noteData.content) {
      alert("Title and content are required");
      return;
    }
    mutate(noteData);
  };
  if (isError) {
    return <QueryError error={error} />;
  }
  return (
    <div className="flex justify-center items-center">
      <div className="card pt-10">
        <div className="card-header">
          <h3 className="card-title">Create Note</h3>
        </div>
        <div className="card-body">
          {isSuccess && <SuccessAlert msg="Note created successfully!" />}
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
                Create Note
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
