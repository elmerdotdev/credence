import React from 'react'

const AppSettings = () => {
  return (
    <>
        <section className='page-appsettings'>
          <h2>App Settings</h2>
            <section className='section-theme'>
                <i className='icon-'></i>
                <h3>Theme</h3>
                <p>Switch between light and dark mode.</p>

                <div className="toggle-switch">
                    <input type="checkbox" className='cb-toggle-switch'></input>
                    <label htmlFor="cb-toggle-switch"></label>
                </div>
            </section>
            <section className='section-notification'>
                <i className='icon-'></i>
                <h3>Notification</h3>
                <p>Turn on the notifications to receive the latest updates.</p>

                <div className="toggle-switch">
                    <input type="checkbox" className='cb-toggle-switch'></input>
                    <label htmlFor="cb-toggle-switch"></label>
                </div>
            </section>
            <section className='section-aboutus'>
                <i className='icon-'></i>
                <h3>About Us</h3>
                <p>Learn more about The Planeteers.</p>
                <button className='learnmore btn btn-primary-reverse'>Learn More <i className='icon-arrow-right'></i></button>
            </section>
            <section className='section-help'>
                <i className='icon-help'></i>
                <h3>Help</h3>
                <p>Contact us for help or assistance.</p>
                <button className='contactus btn btn-primary-reverse'>Contact Us <i className='icon-arrow-right'></i></button>
            </section>
        </section>

        <section className='subscribe'>
            <h2>Subscribe to Our <span className='blue-inpact'>Premium Plan</span></h2>
            <p>Unlimit your experience. Superchange your efficiency.</p>

            <div className="price-box">
                <div className="price">
                    <p>$</p>
                    <p className='blue-inpact'>19.95</p>
                    <p>/ month</p>
                </div>
                
                <button className='btn btn-primary'>Subscribe</button>
            </div>
            
            <h3>You can enjoy:</h3>
            <ul>
                <i className='icon-check'></i><li><span>Unlimited</span> Connection to manage</li>
                <i className='icon-check'></i><li><span>Unlimited</span> Note Entries</li>
                <i className='icon-check'></i><li><span>Unlimited</span> Schedule entries</li>
                <i className='icon-check'></i><li>Search Connection information by Keywords from Events, Connection, Email, and Notes</li>    
            </ul>
        </section>
    </>

  )
}

export default AppSettings
