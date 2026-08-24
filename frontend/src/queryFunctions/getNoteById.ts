import api from "../utils/axios";

const getNoteById = async (id: string) => {
  try {
    const res = await api.get(`/notes/${id}`);
    return res.data;
  } catch (error: any) {
    throw error; // Rethrow the error to be handled by useQuery
  }
};

export default getNoteById;
