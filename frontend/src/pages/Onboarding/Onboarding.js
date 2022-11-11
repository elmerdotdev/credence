import React from 'react'
import { NavLink } from 'react-router-dom'

//css and Images
import page1_img from '../../images/Onboarding/page1_img.svg'
import page2_img from '../../images/Onboarding/page2_img.svg'
import page3_img from '../../images/Onboarding/page3_img.svg'
import page4_img from '../../images/Onboarding/page4_img.svg'


const Onboarding = () => {
  return (
    <section className="page-onboarding">
      <div className="onboarding-page1">
          <h2>Calender</h2>
          <img src={page1_img} alt="onboarding_page1_img" />
          <p>Manage all your shared events with connections,all in one place</p>
          <NavLink to='/dashboard'><button>Skip</button></NavLink>
          <NavLink to=''><button>Next</button></NavLink>
      </div>

      <div className="onboarding-page2">
          <h2>Connection</h2>
          <img src={page2_img} alt="onboarding_page2_img" />
          <p>Add new connections or make updates,and categorize them to your needs</p>
          <NavLink to='/dashboard'><button>Skip</button></NavLink>
          <NavLink to=''><button>Next</button></NavLink>
      </div>

      <div className="onboarding-page3">
          <h2>Quickly Add Things!</h2>
          <img src={page3_img} alt="onboarding_page3_img" />
          <p>Quickly add notes,connection,and events from any of the main screens</p>
          <NavLink to='/dashboard'><button>Skip</button></NavLink>
          <NavLink to=''><button>Next</button></NavLink>
      </div>

      <div className="onboarding-page4">
          <h2>Email Integration</h2>
          <img src={page4_img} alt="onboarding_page4_img" />
          <p>Review and search for Emails without leaving the app with our Gmail integration function</p>
          <NavLink to=''><button>Connect Gmail</button></NavLink>
          <NavLink to='/dashboard'><button>Go to Dashboard</button></NavLink>
      </div>


    </section>
  )
}

export default Onboarding
