import api from "../utils/axios";

const getNotes = async () => {
  try {
    const res = await api.get("/notes/");
    return res.data;
  } catch (error) {
    throw error; // Rethrow the error to be handled by useQuery
  }
};

export default getNotes;
