import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Notesitem from './Notesitem';


function Notes(props) {
    const context =useContext(noteContext);
    const {notes,getNotes}=context;
    useEffect(()=>{
        getNotes()
    },[])
       return (
    <>
     <AddNote/>
      <div className="row my-3">
       <h2>Your Notes</h2>
    {
        notes.map((note)=>{
            return  <Notesitem note={note} key={note._id}/>
        })
    }
    
    </div>
    </>
  )
}

export default Notes