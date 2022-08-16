import NoteContext from "./noteContext";
import { useState} from "react";


const NoteState = (props)=>{
    const host ="https://inotebook554.herokuapp.com/";
    const note=[]
    const [notes,setNotes] =useState(note);

    //Get all Notes
    const getNotes=async()=>{
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify() 
    });
    const json =await response.json(); 
    // console.log(json)   
    setNotes(json) 
}
        
        
        //Add a Note
        const addNote= async(title,description,tag)=>{
            
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST', 
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({title,description,tag}) 
            });
            // const json=response.json({title,description,tag});
            // setNotes(JSON);

            const  note={
                "_id": "62b1pcbeaef481f69fead14bewc",
                "user": "62b138b1fe6cbe479700b3f2",
                "title": title,
                "description": description,
                "tag": tag,
                "__v": 0
            };
              setNotes(notes.concat(note));

         }

         //Delete a Note
         const deleteNote=async(id)=>{
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: 'DELETE', 
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token': localStorage.getItem('token')
                }
            });
            // console.log("Deleting the note with id"+id);
          const  newNotes =notes.filter((note)=>{return note._id!==id});
            setNotes(newNotes);
            
        }

         //Edit a Note
         const editNote= async(id,title,description,tag)=>{
            //API Call
            
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: 'PUT', 
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({title,description,tag}) 
            });
            // const json=response.json();
            let newNotes =JSON.parse(JSON.stringify(notes))
            //Logic to edit in client
            for (let index=0;index<newNotes.length;index++){
                const element =newNotes[index];
                if(element._id===id){
                    element.title=title;
                    element.description=description;
                    element.tag=tag;
                     break;
                }
            }

            setNotes(newNotes);
        }


    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,getNotes,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;