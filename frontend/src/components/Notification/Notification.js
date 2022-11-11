import React, { useEffect, useState } from 'react'

const Notification = (props) => {

    return (
        <div className="notification-message">
            <span>{props.message}</span>
            <span className="icon-close"></span>
        </div>
    )
}

export default Notification