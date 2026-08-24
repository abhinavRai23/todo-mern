import api from "../utils/axios";

const updateNoteApiCall = async ({
  id,
  noteData,
}: {
  id: string;
  noteData: {
    title: string;
    content: string;
  };
}) => {
  console.log(id, noteData);
  try {
    const res = await api.put(`/notes/${id}`, noteData);
    return res.data;
  } catch (error) {
    throw error; // Rethrow the error to be handled by the calling function
  }
};

export default updateNoteApiCall;
