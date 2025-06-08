import mongoose from "mongoose";

const notesSchema = mongoose.Schema({
    noteID : {
        type: Number,
        required: true,
        unique: true
    },
    title : {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    }
})

const Notes = mongoose.model("notes", notesSchema);
export default Notes