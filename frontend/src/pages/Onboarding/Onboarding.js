import React,{ useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Modal from "react-modal"

//css and Images
import '../../fontello/css/credence.css'
import page1_img from '../../images/Onboarding/page1_img.svg'
import page2_img from '../../images/Onboarding/page2_img.svg'
import page3_img from '../../images/Onboarding/page3_img.svg'
import page4_img from '../../images/Onboarding/page4_img.svg'
import circle1_mobile from '../../images/Onboarding/page1_circle_mobile.svg'
import circle2_mobile from '../../images/Onboarding/page2_circle_mobile.svg'
import circle4_mobile from '../../images/Onboarding/page4_circle_mobile.svg'
import circle1_desktop from '../../images/Onboarding/page1_circle_desktop.svg'
import circle2_desktop from '../../images/Onboarding/page2_circle_desktop.svg'
import circle3_desktop from '../../images/Onboarding/page3_circle_desktop.svg'
import circle4_desktop from '../../images/Onboarding/page4_circle_desktop.svg'

const Onboarding = () => {
  
    useEffect(() => {
        document.querySelector('body').removeAttribute("class")
        document.querySelector('body').classList.add('no-sidebar')
      }, [])
  
      const [FirstmodalIsOpen, setFirstModalIsOpen] = useState(true)
      const [SecondmodalIsOpen, setSecondModalIsOpen] = useState(false)
      const [ThirdmodalIsOpen, setThirdModalIsOpen] = useState(false)
      const [ForthmodalIsOpen, setForthModalIsOpen] = useState(false)

      const movepage2 = () => {
        setFirstModalIsOpen(false)
        setSecondModalIsOpen(true)
      }
      const movepage3 = () => {
        setSecondModalIsOpen(false)
        setThirdModalIsOpen(true)
      }
      const movepage4 = () => {
        setThirdModalIsOpen(false)
        setForthModalIsOpen(true)
      }
      const backpage1 = () => {
        setFirstModalIsOpen(true)
        setSecondModalIsOpen(false)
      }
      const backpage2 = () => {
        setSecondModalIsOpen(true)
        setThirdModalIsOpen(false)
      }
      const backpage3 = () => {
        setThirdModalIsOpen(true)
        setForthModalIsOpen(false)
      }

      const navigate = useNavigate()
      const skiptoDashboard = () => {
        navigate('/dashboard')
      }

    return (
    <section className="page-onboarding">
        <Modal isOpen={FirstmodalIsOpen} className='modal-onboarding'>
            <div className="onboarding-page">
            <Link to="/dashboard" className='header-close'><i className='icon-close'></i></Link>
                <div className="grid-box">
                    <div className="title-grid">
                        <h2>Calender</h2>
                        <p>Manage all your shared events with connections, all in one place</p>
                    </div>
                    <div className='design'><img src={page1_img} alt="calender" /></div>
                    <div className="btn-grid">
                        <div className="buttons">
                            <button onClick={skiptoDashboard} className='btn btn-primary-reverse'>Skip</button>
                            <button onClick={movepage2} className='btn btn-primary'>Next</button>
                        </div>
                        <img src={circle1_desktop} alt="page1" className='flow-circles'/>
                    </div>
                </div>
            </div>
        </Modal>

        <Modal isOpen={SecondmodalIsOpen} className='modal-onboarding'>
            <div className="onboarding-page">
                <div className='header-arrow'>
                    <i className='icon-arrow-left' onClick={backpage1}></i>
                    <Link to="/dashboard"><i className='icon-close'></i></Link>
                </div>
                <div className="grid-box">
                    <div className="title-grid">
                        <h2>Connection</h2>
                        <p>Add new connections or make updates, and categorize them to your needs</p>
                    </div>
                    <div className='design'><img src={page2_img} alt="connection" /></div>
                    <div className="btn-grid">
                        <div className="buttons">
                            <button onClick={skiptoDashboard} className='btn btn-primary-reverse'>Skip</button>
                            <button onClick={movepage3} className='btn btn-primary'>Next</button>
                        </div>
                        <img src={circle2_desktop} alt="page2" className='flow-circles'/>
                    </div>
                </div>
            </div>
        </Modal>

        <Modal isOpen={ThirdmodalIsOpen} className='modal-onboarding'>
            <div className="onboarding-page">
                <div className='header-arrow'>
                    <i className='icon-arrow-left' onClick={backpage2}></i>
                    <Link to="/dashboard"><i className='icon-close'></i></Link>
                </div>
                <div className="grid-box">
                    <div className="title-grid">
                        <h2>Quickly Add Things!</h2>
                        <p>Quickly add notes, connection, and events from any of the main screens</p>
                    </div>
                    <div className='design'><img src={page3_img} alt="quick-add" /></div>
                    <div className="btn-grid">
                        <div className="buttons">
                            <button onClick={skiptoDashboard} className='btn btn-primary-reverse'>Skip</button>
                            <button onClick={movepage4} className='btn btn-primary'>Next</button>
                        </div>
                        <img src={circle3_desktop} alt="page3" className='flow-circles'/>
                    </div>
                </div>
            </div>
        </Modal>

        <Modal isOpen={ForthmodalIsOpen} className='modal-onboarding'>
            <div className="onboarding-page">
                <div className='header-arrow'>
                    <i className='icon-arrow-left' onClick={backpage3}></i>
                    <Link to="/dashboard"><i className='icon-close'></i></Link>
                </div>
                <div className="grid-box">
                    <div className="title-grid">
                        <h2>Email Integration</h2>
                        <p className='page4-p'>Review and search for Emails without leaving the app with our Gmail integration function</p>
                    </div>
                    <div className='design'><img src={page4_img} alt="email-integration" /></div>
                    <div className="btn-grid">
                        <div className="buttons-last">
                            <Link to=''><button className='btn btn-primary-reverse gmail-btn'>Connect Gmail</button></Link>
                            <Link to='/dashboard'><button className='btn btn-primary dash-btn'>Go to Dashboard</button></Link>
                        </div>
                        <img src={circle4_desktop} alt="page4" className='flow-circles'/>
                    </div>
                </div>
            </div>
        </Modal>


    </section>
  )
}

export default Onboarding
