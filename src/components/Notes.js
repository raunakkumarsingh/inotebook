import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import Notesitem from './Notesitem';


function Notes(props) {
    const context =useContext(noteContext);
    const {notes,setNotes}=context;
  return (
      <div className="container my-2">
       <h2>Your Notes</h2>
    {
        notes.map((note)=>{
            return <Notesitem note={note}/>
        })
    }
    
    </div>
  )
}

export default Notes