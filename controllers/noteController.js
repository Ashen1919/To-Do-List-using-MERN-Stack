import Notes from "../models/notes.js"


//create new note
export function createNote(req,res){
    const {title, description } = req.body
    const email = req.user.email
    const date = new Date();
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString();

    //auto-generated ID
    const startingID = 1001
    Notes.countDocuments({}).then((count) => {
        const newID = startingID + count + 1;
        const newNote = new Notes({
            noteID : newID,
            title,
            description,
            email,
            dateString, 
            timeString
        })
        newNote.save().then((result) => {
            res.status(200).json({
                message: "New Note Created successful",
                note: result
            })
        }).catch((err) => {
            res.status(500).json({
                message: "Fail to create note",
                error: err
            })
        })
    }).catch((error) => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        })
    })

}

//get all notes
export function getNotes(req,res){
    Notes.find().then((result) => {
        res.status(200).json({
            message: "Notes Found",
            notes: result
        })
    }).catch((err) => {
        res.status(500).json({
            message: "Fail to found notes",
            error: err
        })
    })
}

//get notes by email
export function getNotesByEmail(req,res){
    const email = req.params.email
    Notes.find({email: email}).then((result) => {
        if(result == null){
            res.status(404).json({
                message: "Notes not found"
            })
        } else{
            res.status(200).json({
                message: "Notes Found",
                notes: result
            })
        }
    }).catch((err) => {
        res.status(500).json({
            error: err.message
        })
    })
}

//Update notes
export function updateNotes(req,res){
    const noteID = req.params.noteID
    const updateInfo = req.body

    Notes.updateOne({noteID : noteID}, {$set: updateInfo}).then((result) => {
        res.status(200).json({
            message: "Note Update Successfully",
            notes: result
        })
    }).catch((err) => {
        res.status(500).json({
            error: err.message
        })
    })
}

//delete note
export function deleteNotes(req,res){
    const noteID = req.params.noteID
    Notes.deleteOne({noteID : noteID}).then(() => {
        res.status(200).json({
            message: "Note deleted successfully"
        })
    }).catch((err) => {
        res.status(500).json({
            error: err.message
        })
    })
}