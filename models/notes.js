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
    },
    email: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    dateString: {
        type: String,
        required: true
    },
    timeString: {
        type: String,
        required: true
    }
})

const Notes = mongoose.model("notes", notesSchema);
export default Notes