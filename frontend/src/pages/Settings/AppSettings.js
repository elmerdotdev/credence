import Modal from "react-modal"
import React, { useState } from 'react'

//page
import Aboutus from "./Aboutus"

const AppSettings = () => {
  
    const [aboutusModalIsOpen, setAboutusModalIsOpen]= useState(false)
    const [subscmodalIsOpen, setSubscModalIsOpen] = useState(false)
    return (
    <>
        <section className='page-appsettings'>
          <h2>App Settings</h2>
            <div className="app-setting-box">
                <section className='section-theme'>
                    <div className="title-icon">
                        <i className='icon-profile'></i>
                        <h3>Theme</h3>
                    </div>
                    <p>Switch between light and dark mode</p>

                    <div className="toggle-switch">
                        <input type="checkbox" className='cb-toggle-switch'></input>
                        <label htmlFor="cb-toggle-switch"></label>
                    </div>
                </section>
                <section className='section-notification'>
                    <div className="title-icon">
                        <i className='icon-profile'></i>
                        <h3>Notification</h3>
                    </div>
                    <p>Turn on the notifications to receive the latest updates</p>

                    <div className="toggle-switch">
                        <input type="checkbox" className='cb-toggle-switch'></input>
                        <label htmlFor="cb-toggle-switch"></label>
                    </div>
                </section>
                <section className='section-aboutus'>
                    <div className="title-icon">
                        <i className='icon-profile'></i>
                        <h3>About Us</h3>
                    </div>
                    <p>Learn more about The Planeteers</p>
                    <button onClick={() => setAboutusModalIsOpen(true)} className='learnmore btn btn-primary-reverse'>Learn More <i className='icon-arrow-right'></i></button>
                    <Modal isOpen={aboutusModalIsOpen} className="aboutus-page-modal-modal">
                        <Aboutus aboutusIsOpen={aboutusModalIsOpen} onsetAboutusIsOpen={setAboutusModalIsOpen}/>
                    </Modal>
                </section>

                <section className='section-help'>
                    <div className="title-icon">
                        <i className='icon-help'></i>
                        <h3>Help</h3>
                    </div>
                    <p>Contact us for help or assistance</p>
                    <button className='contactus btn btn-primary-reverse'>Contact Us <i className='icon-arrow-right'></i></button>
                </section>
            </div>
        </section>

        <section className='subscribe'>
            <div className="title-subsc">
                <h2>Subscribe to Our <span className='blue-title'>Premium Plan</span></h2>
                <p>Superchange your efficiency.</p>
            </div>

            <div className="price-box">
                <div className="price">
                    <p>$</p>
                    <p className='blue-price'>19.95</p>
                    <p>/ month</p>
                </div>
                
                <button onClick={() => setSubscModalIsOpen(true)} className='btn btn-primary'>Subscribe</button>
                <Modal isOpen={subscmodalIsOpen} className="subscribe-modal-premium">
                    <div className="subsc-modal">
                        <h2>Thank you for Subscribing!</h2>
                        <p>Now you subscribe our Premium Plan</p>
                        <button className="btn btn-primary-reverse" onClick={() => setSubscModalIsOpen(false)}>Close</button>
                    </div>
                </Modal>
            </div>
            
            <div className="desc-subsc">
                <h3>You can enjoy:</h3>
                <ul>
                    <li><i className='icon-check'></i><span>Unlimited</span> Client Management</li>
                    <li><i className='icon-check'></i><span>Unlimited</span> Note Entries</li>
                    <li><i className='icon-check'></i>Create <span>Unlimited</span> Schedule entries</li>
                    <li>
                        <i className='icon-check'></i>
                        <span>Search Connection information <span>by Keywords from Events, Connection, Emails, and Notes</span></span>
                    </li>
                </ul>
            </div>
        </section>
    </>

  )
}

export default AppSettings
