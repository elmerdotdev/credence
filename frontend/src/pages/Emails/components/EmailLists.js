import React from 'react'
import moment from 'moment'

const EmailList = ({emails}) => {
    let utcSeconds = emails.emailTime/1000;
    let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(utcSeconds)

    return (
        <div className="single-email">
        <p className='email-time'> {<span>{moment(d).format("DD MMM YYYY, hh:mm a")}</span>}</p>
        <h4>{emails.subject}</h4>
        <p><span className='email-from'>From</span> {emails.from}</p>
        <p><span className='email-to'>To</span> {emails.to}</p>
        <p>{emails.snippet}</p>
        </div>
    )
}

export default EmailList