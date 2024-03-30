import React from 'react'
import { useNavigate } from 'react-router-dom'

const DialogAddress = ({onDialog}) => {
    const navigate=useNavigate()
    const addressDialogHandler=()=>{
      onDialog(false)
      navigate('/account/setting')
  
    }
  return (
    <>
    <div className="dialog-address-container">
      <div className="dialog">
        <div className="message">
          <h2>Please provide your Address details!</h2>
        </div>
          <div className="options">
            <div className="confirm btn-dialog" onClick={addressDialogHandler}>Go to Settings</div>
            <div className="cancel btn-dialog" onClick={()=>onDialog(false)}>Cancel</div>
          </div>
      </div>
    </div>
  </>
  )
}

export default DialogAddress