import React, { useContext, useEffect,useRef,useState } from 'react'
import noteContext from '../context/notes/noteContext';
import {useNavigate} from 'react-router-dom'
import AddNote from './AddNote';
import Notesitem from './Notesitem';


function Notes (props) {
    const context=useContext(noteContext);
    const {notes,getNotes,editNote}=context;
    
    const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:"default"})
    
    const history =useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('token')){

            getNotes();
        }
        else{
          history("/login");

        }
    },[])

    const ref=useRef(null);
    const refClose=useRef(null);

    const handleClick=(e)=>{
        // console.log("updating notes",note)
        editNote(note.id,note.etitle,note.edescription,note.etag);
        e.preventDefault();
        ref.current.click();
            //  editNote(note.etitle,note.edescription,note.etag);
            props.showAlert("Updated Note Successfully","success");
    }

    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }

    const updateNote= (currentnote)=>{
          ref.current.click();
        //   console.log(currentnote.title)
         setNote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag});
        
    }
       return (
    <>
     <AddNote showAlert={props.showAlert}/>
  
<button type="button" ref={ref} className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" >
  Launch modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Update Notes</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className='container my-3'>
  <div className="mb-3">
    <label htmlFor="etitle" className="form-label">Title</label>
    <input type="etitle" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" minLength={5} required onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="edescription" className="form-label">Description</label>
    <input type="edescription" className="form-control" name='edescription' id="edescription" value={note.edescription} minLength={5} required onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="etag" className="form-label">Tag</label>
    <input type="etag" className="form-control" name='etag' id="etag" value={note.etag} onChange={onChange} minLength={5} required/>
  </div>
  
  
</form>
      </div>
      <div className="modal-footer">
        <button  ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" disabled={ note.etitle.length<5 || note.edescription.length<5}  onClick={handleClick} className="btn btn-primary">Update changes</button>
      </div>
    </div>
  </div>
</div>
      
      
      <div className="row my-3">
       <h2>Your Notes</h2>
    {
        notes.map((note)=>{
            return  <Notesitem note={note} updateNote={updateNote} showAlert={props.showAlert} editNote={editNote} key={note._id}/>
        })
    }
    
    </div>
    </>
  )
}

export default Notes