import api from "../utils/axios";

const callDeleteNoteApi = async (noteId: string) => {
  try {
    const res = await api.delete(`/notes/${noteId}`);
    return res.data;
  } catch (error) {
    throw error; // Rethrow the error to be handled by the calling function
  }
};

export default callDeleteNoteApi;
