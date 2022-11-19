import React from 'react'
import { Link } from 'react-router-dom'


const SelectPlan = () => {
  return (
    <div className='page-select-plan'>
        <div className='page-select-plan header-arrow'>
            <p>return</p>
            <p>delete</p>
        </div>
        <h1>Select a Plan</h1>

        <section className='free-plan'>
            <h2>FREE PLAN</h2>
            <h3>Free for Indivisuals to try.</h3>
            <p>$</p>
            <p>CAD</p>

            <p>0</p>
            <p>/Free Forever</p>

            <h3>You can enjoy:</h3>
            <ul>
                <li><b>Up to 8</b> Connections to manage</li>
                <li><b>Up to 50</b> Note Entries</li>
                <li><b>Up to 50</b> Calender Entries</li>
                <li>Search Connection Information <b>by Name Only</b></li>
            </ul>
            <button><Link to="/" >Start for Free</Link></button>
        </section>

        <section className='premium-plan'>
        <h2>PREMIUM PLAN</h2>
            <h3>Supercharge your efficiency.<b/>Start free.</h3>
            <p>$</p>
            <p>CAD</p>

            <p>19.95</p>
            <p>/month</p>

            <h3>You can enjoy:</h3>
            <ul>
                <li><b>Unlimited</b> Connections to manage</li>
                <li><b>Unlimited</b> Note Entries</li>
                <li><b>Unlimited</b>Schedule Entries</li>
                <li>Search Connection Information <b>by Keywords from Events, Connection, Emails, and Notes</b></li>
            </ul>
            <button><Link to="/" >Start My 30-Day Trial</Link></button>
        </section>
    </div>
  )
}

export default SelectPlan