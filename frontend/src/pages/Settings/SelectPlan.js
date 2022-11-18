import React from 'react'
import { Link } from 'react-router-dom'


const SelectPlan = (props) => {
    const {selectPlanIsOpen, onsetselectPlanIsOpen} = props;

    const closepage = () => {
        onsetselectPlanIsOpen(false)
      }  

  return (
    <div className='page-select-plan'>
        
        <h2>Select a Plan to Continue</h2>

        <section className='free-plan'>
            <h3>FREE PLAN</h3>
            <h4>Free for Indivisuals to try.</h4>
            <div className="price-box">
                <div className="cad">
                    <p>$</p>
                    <p>CAD</p>
                </div>
                <p>0</p>
                <p>/Free Forever</p>
            </div>

            <div className="contents-box">
                <p>You can enjoy:</p>
                <ul>
                    <li><i className='icon-check'></i><span><b>Up to 8</b> Connections to manage</span></li>
                    <li><i className='icon-check'></i><span><b>Up to 50</b> Note Entries</span></li>
                    <li><i className='icon-check'></i><span><b>Up to 50</b> Calender Entries</span></li>
                    <li><i className='icon-check'></i><span>Search Connection Information <b>by Name Only</b></span></li>
                </ul>
            </div>
            <button className='btn btn-primary-reverse'>Start for Free</button>
        </section>

        <section className='premium-plan'>
            <h3>PREMIUM PLAN</h3>
            <h4>Supercharge your efficiency.<br/>Start free.</h4>

            <div className="price-box">
                <div className="cad">
                    <p>$</p>
                    <p>CAD</p>
                </div>
                <p>19.95</p>
                <p>/month</p>
            </div>

            <div className="contents-box">
                <p>You can enjoy:</p>
                <ul>
                    <li><i className='icon-check'></i><span><b>Unlimited</b> Connections to manage</span></li>
                    <li><i className='icon-check'></i><span><b>Unlimited</b> Note Entries</span></li>
                    <li><i className='icon-check'></i><span><b>Unlimited</b>Schedule Entries</span></li>
                    <li><i className='icon-check'></i><span>Search Connection Information <b>by Keywords from Events, Connection, Emails, and Notes</b></span></li>
                </ul>
            </div>
            <button className="btn btn-primary">Start My 30-Day Trial</button>
        </section>
        <button onClick={closepage} className='btn btn-primary-reverse'>Close</button>
    </div>
  )
}

export default SelectPlan