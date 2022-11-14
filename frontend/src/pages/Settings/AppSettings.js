import React from 'react'

const AppSettings = () => {
  return (
    <>
        <section className='page-appsettings'>
          <h2>App Settings</h2>
            <section className='theme'>
                <i className='icon-'></i>
                <h3>Theme</h3>
                <p>Switch between light and dark mode.</p>
                <input></input>
            </section>
            <section className='notification'>
                <i className='icon-'></i>
                <h3>Notification</h3>
                <p>Turn on the notifications to receive the latest updates.</p>
                <input></input>
            </section>
            <section className='about us'>
                <i className='icon-'></i>
                <h3>About Us</h3>
                <p>Learn more about The Planeteers.</p>
                <button>Learn More <i className='icon-'></i></button>
            </section>
            <section className='help'>
                <i className='icon-help'></i>
                <h3>Help</h3>
                <p>Contact us for help or assistance.</p>
                <button>Contact Us <i className='icon-'></i></button>
            </section>
        </section>

        <section className='subscribe'>
            <h2>Subscribe to Our <span>Premium Plan</span></h2>
            <h3>Superchange your efficiency.</h3>

            <h3>You can enjoy:</h3>
            <ul>
                <i className='icon-check'></i><li><span>Unlimited</span> Connection to manage</li>
                <i className='icon-check'></i><li><span>Unlimited</span> Note Entries</li>
                <i className='icon-check'></i><li><span>Unlimited</span> Schedule entries</li>
                <i className='icon-check'></i><li>Search Connection information by Keywords from Events, Connection, Email, and Notes</li>

                <p>$</p>
                <p>19.95</p>
                <p>/ month</p>

                <button>Subscribe</button>
            </ul>
        </section>
    </>

  )
}

export default AppSettings
