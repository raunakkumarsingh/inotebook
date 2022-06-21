import React, { useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';


function Notesitem(props) {

    const context=useContext(noteContext);
    const {deleteNote}=context;
    const {note}=props;
  return (
    <div className="col-md-3 my-2">
    <div className=" card " >
  <div className="card-body">
    <div className='d-flex aling-item-center'>
    <h5 className="card-title">{note.title}</h5>
    <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)}}></i>
    <i className="fa-solid fa-pen-to-square mx-2 "></i>
    </div>
    <p className="card-text">{note.description}</p>
  </div>
</div>
</div>
  )
}

export default Notesitem