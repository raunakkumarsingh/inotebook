import React, { useContext } from 'react'
import AddNote from './AddNote'
import Alert from './Alert'
import Notes from './Notes'



function Home() {
   

  return (
    <div className="container my-3">
        <Notes/>
    </div>
  )
}

export default Home