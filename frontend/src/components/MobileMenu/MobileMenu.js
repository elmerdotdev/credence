import React from 'react'

const MobileMenu = (props) => {
    return (
        <div className="burger" onClick={props.onToggleMenu}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

export default MobileMenu