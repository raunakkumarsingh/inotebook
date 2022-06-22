const express=require('express');
const router=express.Router();
const fetchuser =require('../middleware/fetchuser');
const Note = require('../models/note');
const { body, validationResult } = require('express-validator');

//Route 1: get all the notes using GET "/api/auth/getuser" .login required

router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    try {
        const notes = await Note.find({user:req.user.id});
        res.json(notes);       
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

//Route 2 Add a new Notes usinng : POST 
router.post('/addnote',fetchuser,[
    body('title','Enter a valid title').isLength({min:3}),
    body('description','description must be atleast 50  characters').isLength({min:5}),
], async (req,res)=>{

    
try{

    const{title,description,tag}=req.body;
    
    //if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    
    const note=new Note({
        title, description,tag, user:req.user.id
    })
    const saveNote=await note.save()
    // const notes = await Notes.find({user:req.user.id});
    res.json(saveNote);

}
catch(error){
    console.error(error.message);
    res.status(500).send("Some Error occured");
}
})
// update an exisisying note : POST " api/auth/updatenote".login Required
router.put('/updatenote/:id',fetchuser, async (req,res)=>{
    try {
       const {title,description,tag}=req.body;
       //create a newNote object
       let  newNotes={};
       if(title){newNotes.title=title};
       if(description){newNotes.description=description};
       if(tag){newNotes.tag=tag};
       //find the note to be updated and update it 
       let note= await Note.findById(req.params.id);
       if(!note){return res.status(404).send("Not Found")}

       if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
       }
       note=await Note.findByIdAndUpdate(req.params.id,{$set:newNotes},{new:true})
        res.json(note);       
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

//Route 4 delete an existiong note: DELETE "/api/notes/deletenode". login required
router.delete('/deletenote/:id',fetchuser, async (req,res)=>{
    try {
       const {title,description,tag}=req.body;
       //find the note to be updated and update it 
       let note= await Note.findById(req.params.id);
       if(!note){return res.status(404).send("Not Found")}

       if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
       }
       note=await Note.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note has been deleted"});       
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})



module.exports=router