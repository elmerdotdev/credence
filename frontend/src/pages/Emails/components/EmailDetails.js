import React, { useEffect, useState } from 'react'
import EmailList from './EmailLists'

const NoteDetails = ({emails}) => {


    return (
        <div>

            <section className="email-details" >
            {emails && emails.map((emails, i) => (
                    <EmailList 
                        key={i} 
                        emails = {emails}
                                         />
                ))}
            </section>
        </div>

    )
}

export default NoteDetails