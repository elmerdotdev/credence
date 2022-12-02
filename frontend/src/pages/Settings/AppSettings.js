import Modal from "react-modal"
import React, { useState } from 'react'
//page
import Aboutus from "./Aboutus"
//image
import ThePlaneteers from '../../images/Setting/ThePlaneteers.svg'

const AppSettings = ({ onDarkMode, darkModeToggle }) => {
    const [aboutusModalIsOpen, setAboutusModalIsOpen]= useState(false)
    const [subscmodalIsOpen, setSubscModalIsOpen] = useState(false)
    const [contactusmodalIsOpen, setContactusModalIsOpen] = useState(false)
    return (
    <>
        <section className='page-appsettings'>
          <h2>App Settings</h2>
            <div className="app-setting-box">
                <section className='section-theme'>
                    <div className="title-icon">
                        <i className='icon-theme'></i>
                        <h3>Theme</h3>
                    </div>
                    <p>Switch between light and dark mode</p>
                    <label className={`switch`}>
                        <input type="checkbox" checked={onDarkMode} onChange={darkModeToggle} />
                        <span className="slider round"></span>
                    </label>
                </section>
                
                <section className='section-notification'>
                    <div className="title-icon">
                        <i className='icon-bell'></i>
                        <h3>Notification</h3>
                    </div>
                    <p>Turn on the notifications to receive the latest updates</p>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                </section>
                
                <section className='section-aboutus'>
                    <div className="title-icon">
                        <i className='icon-info'></i>
                        <h3>About Us</h3>
                    </div>
                    <p>Learn more about The Planeteers</p>
                    <button onClick={() => setAboutusModalIsOpen(true)} 
                            className='learnmore btn btn-primary-reverse'>
                            Learn More 
                            <i className='icon-arrow-right'></i>
                    </button>
                    <Modal  isOpen={aboutusModalIsOpen} 
                            className="aboutus-page-modal-modal"
                            closeTimeoutMS={500}
                    >
                        <Aboutus    aboutusIsOpen={aboutusModalIsOpen} 
                                    onsetAboutusIsOpen={setAboutusModalIsOpen}
                        />
                    </Modal>
                </section>

                <section className='section-help'>
                    <div className="title-icon">
                        <i className='icon-help'></i>
                        <h3>Help</h3>
                    </div>
                    <p>Contact us for help or assistance</p>
                    <button onClick={() => setContactusModalIsOpen(true)} 
                            className='contactus btn btn-primary-reverse'>
                            Contact Us 
                            <i className='icon-arrow-right'></i>
                    </button>
                    <Modal
                        isOpen={contactusmodalIsOpen} className="contactus-modal-modal"
                        closeTimeoutMS={500}
                    >
                        <div className="contactus-modal">
                            <h2>Contact Us</h2>
                            <img src={ThePlaneteers} alt="The planeteers" />
                            <h3>Langara College</h3>
                            <p>Web and Mobile App Design and Development</p>
                            <p>100 West 49th Avenue, Vancouver, BC Canada V5Y 2Z6</p>
                            <p>credence.crm.app@gmail.com</p>
                            <button className="contactus-btn btn btn-primary-reverse" 
                                    onClick={() => setContactusModalIsOpen(false)}>
                                    Close
                            </button>
                        </div>
                    </Modal>
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
                
                <button onClick={() => setSubscModalIsOpen(true)} 
                        className='btn btn-primary'>
                        Subscribe
                </button>
                <Modal
                    isOpen={subscmodalIsOpen} className="subscribe-modal-premium"
                    closeTimeoutMS={500}
                >
                    <div className="subsc-modal">
                        <h2>Thank you for Subscribing!</h2>
                        <p>Now you subscribe our Premium Plan</p>
                        <button className="btn btn-primary-reverse" 
                                onClick={() => setSubscModalIsOpen(false)}>
                                Close
                        </button>
                    </div>
                </Modal>
            </div>
            
            <div className="desc-subsc">
                <h3>You can enjoy:</h3>
                <ul>
                    <li><i className='icon-check'></i><span>Unlimited</span> Connections to manage</li>
                    <li><i className='icon-check'></i><span>Unlimited</span> Note Entries</li>
                    <li><i className='icon-check'></i><span>Unlimited</span> Schedule entries</li>
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
