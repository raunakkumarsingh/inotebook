import React, { useContext } from 'react'
import AddNote from './AddNote'
import Alert from './Alert'
import Notes from './Notes'



function Home(props) {
    const {showAlert}=props

  return (
    <div className="container my-3">
        <Notes showAlert={showAlert}/>
    </div>
  )
}

export default Home