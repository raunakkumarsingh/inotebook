import NoteContext from "./noteContext";
import { useState,useEffect } from "react";


const NoteState =(props)=>{
         const note=
         [
            {
              "_id": "62b15471059e0e34fcdbc454",
              "user": "62b138b1fe6cbe479700b3f2",
              "title": "My Titles",
              "description": "Please waked up early",
              "tag": "persal",
              "__v": 0
            },
            {
              "_id": "62b1cbeaef481f69fead1bec",
              "user": "62b138b1fe6cbe479700b3f2",
              "title": "Myles",
              "description": " early",
              "tag": "persal",
              "__v": 0
            }
          ]

         const [notes,setNotes] =useState(note);


    return(
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;