import api from "../utils/axios";

const createNoteApiCall = async (noteData: {
  title: string;
  content: string;
}) => {
  try {
    const res = await api.post("/notes/", noteData);
    return res.data;
  } catch (error) {
    throw error; // Rethrow the error to be handled by the calling function
  }
};

export default createNoteApiCall;
