import React, { useEffect, useState } from 'react'

const Notification = ({ message, onClose} ) => {
    const [notificationStatus, setNotificationStatus] = useState(false)

    useEffect(() => {
        notificationOpen(true)

        setTimeout(() => {
            notificationOpen(false)
            setTimeout(() => {
                onClose()
            }, 1000)
        }, 3000)
    }, [onClose])

    const notificationOpen = (status) => {
        setNotificationStatus(status)
    }

    return (
        <div className={`notification-message ${notificationStatus && 'notification-message-open'}`}>
            <span>{message}</span>
            <span className="icon-close" onClick={() => setNotificationStatus(false)}></span>
        </div>
    )
}

export default Notification