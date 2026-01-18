import Notes from "../models/notes.js"

// Create new note
export async function createNote(req, res) {
    try {
        const { title, description } = req.body;
        const email = req.user.email;
        const date = new Date();
        const dateString = date.toLocaleDateString();
        const timeString = date.toLocaleTimeString();

        // Auto-generated ID
        const startingID = 1001;
        const count = await Notes.countDocuments({});
        const newID = startingID + count + 1;

        const newNote = new Notes({
            noteID: newID,
            title,
            description,
            email,
            dateString,
            timeString
        });

        const result = await newNote.save();
        
        res.status(201).json({
            message: "New Note Created successfully",
            note: result
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to create note",
            error: err.message
        });
    }
}

// Get all notes
export async function getNotes(req, res) {
    try {
        const result = await Notes.find();
        res.status(200).json({
            message: "Notes Found",
            notes: result
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to find notes",
            error: err.message
        });
    }
}

// Get notes by email
export async function getNotesByEmail(req, res) {
    try {
        const email = req.params.email;
        const result = await Notes.find({ email });
        
        if (result.length === 0) {
            return res.status(404).json({
                message: "Notes not found"
            });
        }
        
        res.status(200).json({
            message: "Notes Found",
            notes: result
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to find notes",
            error: err.message
        });
    }
}

// Get notes by noteID
export async function getNotesByNoteID(req, res) {
    try {
        const noteID = req.params.noteID;
        const result = await Notes.findOne({ noteID });
        
        if (!result) {
            return res.status(404).json({
                message: "Note not found"
            });
        }
        
        res.status(200).json({
            message: "Note Found",
            note: result
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to find note",
            error: err.message
        });
    }
}

// Update notes
export async function updateNotes(req, res) {
    try {
        const noteID = req.params.noteID;
        const updateInfo = req.body;
        
        const result = await Notes.updateOne({ noteID }, { $set: updateInfo });
        
        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: "Note not found"
            });
        }
        
        res.status(200).json({
            message: "Note Updated Successfully",
            modifiedCount: result.modifiedCount
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to update note",
            error: err.message
        });
    }
}

// Delete note
export async function deleteNotes(req, res) {
    try {
        const noteID = req.params.noteID;
        const result = await Notes.deleteOne({ noteID });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Note not found"
            });
        }
        
        res.status(200).json({
            message: "Note deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to delete note",
            error: err.message
        });
    }
}