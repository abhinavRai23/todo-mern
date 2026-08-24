import Note from "../models/Note.js";

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(
            notes.map((note) => ({
                id: note._id,
                title: note.title,
                content: note.content,
                date: note.createdAt,
            })),
        );
    } catch (error) {
        console.error("Error fetching notes:", error);
        res
            .status(500)
            .json({ message: "Error fetching notes", error: error.message });
    }
};

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res
                .status(400)
                .json({ message: "Title and content are required" });
        }
        const note = new Note({ title, content });
        await note.save();
        res
            .status(201)
            .json({
                message: "Note created successfully",
                receivedNote: { title: note.title, content: note.content },
            });
    } catch (error) {
        console.error("Error creating note:", error);
        res
            .status(500)
            .json({ message: "Error creating note", error: error.message });
    }
};

export const getNoteById = async (req, res) => {
    try {
        const noteId = req.params.id;
        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({
            message: `Note with ID ${noteId} fetched successfully`,
            note: {
                title: note.title,
                content: note.content,
            },
        });
    } catch (error) {
        console.error("Error fetching note:", error);
        res
            .status(500)
            .json({ message: "Error fetching note", error: error.message });
    }
};

export const updateNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const { title, content } = req.body;
        const note = await Note.findByIdAndUpdate(
            noteId,
            { title, content },
            { returnDocument: "after" },
        );
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res
            .status(200)
            .json({
                message: `Note with ID ${noteId} updated successfully`,
                updatedNote: { title: note.title, content: note.content },
            });
    } catch (error) {
        console.error("Error updating note:", error);
        res
            .status(500)
            .json({ message: "Error updating note", error: error.message });
    }
};

export const patchNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        Object.assign(note, req.body);
        await note.save();
        res
            .status(200)
            .json({
                message: `Note with ID ${noteId} patched successfully`,
                patchedNote: { title: note.title, content: note.content },
            });
    } catch (error) {
        console.error("Error patching note:", error);
        res
            .status(500)
            .json({ message: "Error patching note", error: error.message });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const note = await Note.findByIdAndDelete(noteId);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res
            .status(200)
            .json({
                message: `Note with ID ${noteId} deleted successfully`,
                deletedNote: { title: note.title, content: note.content },
            });
    } catch (error) {
        console.error("Error deleting note:", error);
        res
            .status(500)
            .json({ message: "Error deleting note", error: error.message });
    }
};
