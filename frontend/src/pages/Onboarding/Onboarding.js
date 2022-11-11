import React,{ useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from "react-modal"

//css and Images
import page1_img from '../../images/Onboarding/page1_img.svg'
import page2_img from '../../images/Onboarding/page2_img.svg'
import page3_img from '../../images/Onboarding/page3_img.svg'
import page4_img from '../../images/Onboarding/page4_img.svg'

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

    return (
    <section className="page-onboarding">
      <Modal isOpen={FirstmodalIsOpen}>
          <div className="onboarding-page1">
              <h2>Calender</h2>
              <p>Manage all your shared events with connections,all in one place</p>
              <img src={page1_img} alt="onboarding_page1_img" />
          
              <Link to='/dashboard'><button>Skip</button></Link>
              <button onClick={movepage2}>Next</button>
          </div>
      </Modal>

      <Modal isOpen={SecondmodalIsOpen}>
          <div className="onboarding-page2">
              <h2>Connection</h2>
              <p>Add new connections or make updates,and categorize them to your needs</p>
              <img src={page2_img} alt="onboarding_page2_img" />
              <Link to='/dashboard'><button>Skip</button></Link>
              <button onClick={movepage3}>Next</button>
          </div>
      </Modal>

      <Modal isOpen={ThirdmodalIsOpen}>
          <div className="onboarding-page3">
              <h2>Quickly Add Things!</h2>
              <p>Quickly add notes,connection,and events from any of the main screens</p>
              <img src={page3_img} alt="onboarding_page3_img" />
              <Link to='/dashboard'><button>Skip</button></Link>
              <button onClick={movepage4}>Next</button>
          </div>
      </Modal>

      <Modal isOpen={ForthmodalIsOpen}>
          <div className="onboarding-page4">
              <h2>Email Integration</h2>
              <p>Review and search for Emails without leaving the app with our Gmail integration function</p>
              <img src={page4_img} alt="onboarding_page4_img" />
              <Link to=''><button>Connect Gmail</button></Link>
              <Link to='/dashboard'><button>Go to Dashboard</button></Link>
          </div>
      </Modal>


    </section>
  )
}

export default Onboarding
