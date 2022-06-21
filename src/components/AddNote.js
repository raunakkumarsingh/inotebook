import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import { useState } from 'react';

function AddNote() {
    const context=useContext(noteContext);
    const {addNote}=context;
    const [note,setNote]=useState({title:"",description:"",tag:"default"})
    const handleClick=(e)=>{
        e.preventDefault();
             addNote(note.title,note.description,note.tag);
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value});

    }
  return (
    <div>
        <form className='container my-3'>
  <div className="mb-3">
    <h2>Add a Notes</h2>
    <label htmlFor="title" className="form-label">Title</label>
    <input type="title" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="description" className="form-control" name='description' id="description" onChange={onChange}/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" onClick={handleClick} className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default AddNote