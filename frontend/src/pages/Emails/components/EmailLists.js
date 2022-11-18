import React from 'react'

const EmailList = ({emails}) => {


    return (
        <div>
        <h4>{emails.subject}</h4>
        <p>{emails.emailTime}</p>
        <p>{emails.snippet}</p>
        </div>
    )
}

export default EmailList