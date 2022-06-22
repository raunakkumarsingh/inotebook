import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import { useState } from 'react';

function AddNote(props) {
    const context=useContext(noteContext);
    const {addNote}=context;
    const [note,setNote]=useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
        e.preventDefault();
             addNote(note.title,note.description,note.tag);
             setNote({title:"",description:"",tag:""});
             props.showAlert("Notes Added Successfully","success");
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
    <input type="title" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="description" className="form-control" name='description' value={note.description} id="description" onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="tag" className="form-control" name='tag' id="tag" value={note.tag} onChange={onChange}/>
  </div>
  
  <button type="submit" onClick={handleClick} className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default AddNote