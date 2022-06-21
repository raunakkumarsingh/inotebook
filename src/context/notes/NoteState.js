import NoteContext from "./noteContext";
import { useState,useEffect } from "react";


const NoteState = (props)=>{
    const host ="http://localhost:5000";
    const note=[]
    const [notes,setNotes] =useState(note);

    //Get all Notes
    const getNotes=async()=>{
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMTM4YjFmZTZjYmU0Nzk3MDBiM2YyIn0sImlhdCI6MTY1NTc4MTU1M30.mKLhwof2A3duEms7rdGJhm_LADTrrmJaKdIsvRWVi2c"
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
                  'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMTM4YjFmZTZjYmU0Nzk3MDBiM2YyIn0sImlhdCI6MTY1NTc4MTU1M30.mKLhwof2A3duEms7rdGJhm_LADTrrmJaKdIsvRWVi2c"
                },
                body: JSON.stringify() 
            });
            // const json=response.json({title,description,tag});
          

            // const  note={
            //     "_id": "62b1pcbeaef481f69fead14bewc",
            //     "user": "62b138b1fe6cbe479700b3f2",
            //     "title": title,
            //     "description": description,
            //     "tag": tag,
            //     "__v": 0
            // };
            //   setNotes(notes.concat(note));

         }

         //Delete a Note
         const deleteNote=(id)=>{
            console.log("Deleting the note with id"+id);
          const  newNotes =notes.filter((note)=>{return note._id!==id});
            setNotes(newNotes);
            
        }

         //Edit a Note
         const editNote= async(id,title,description,tag)=>{
            //API Call
            
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: 'POST', 
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMTM4YjFmZTZjYmU0Nzk3MDBiM2YyIn0sImlhdCI6MTY1NTc4MTU1M30.mKLhwof2A3duEms7rdGJhm_LADTrrmJaKdIsvRWVi2c"
                },
                body: JSON.stringify({title,description,tag}) 
            });
            // const json=response.json();
            //Logic to edit in client
            for (let index=0;index<notes.length;index++){
                const element =notes[index];
                if(element._id===id){
                    element.title=title;
                    element.description=description;
                    element.tag=tag;

                }
            }

            
        }


    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,getNotes,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;