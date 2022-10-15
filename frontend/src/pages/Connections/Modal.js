import React from 'react'
import AddConnection from './AddConnection'


// const MODAL_STYLES = {
//     position:'fixed',
//     top:'50%',
//     left:'50%',
//     transform:'translate(-50%, -50%)',
//     backgroundColor:'#FFF',
//     PADDING:'50px',
//     zIndex: 1000
// }

// const OVERLAY_STYLES ={
//     position:'fixed',
//     top:0,
//     left:0,
//     right:0,
//     bottom:0,
//     backgroundColor: 'rgba(0,0,0,.7)',
//     zIndex:1000
// }

const Modal = ({closeModal}) => {
    return (
        <div className='modalBackground'>
           <div className='modalContainer'>
            <button onClick={() => closeModal(false)}> X </button>
            <AddConnection />
            <div className='modal_footer'>
                <button onClick={() => closeModal(false)}>Cancel</button>
                <button>Save</button>
            </div>
           </div>
        </div>
      )

}

export default Modal

