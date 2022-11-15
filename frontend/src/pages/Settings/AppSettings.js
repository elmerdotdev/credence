import React from 'react'

const AppSettings = () => {
  return (
    <>
        <section className='page-appsettings'>
          <h2>App Settings</h2>
            <section className='section-theme'>
                <i className='icon-profile'></i>
                <div className="title-contents">
                    <h3>Theme</h3>
                    <p>Switch between light and dark mode.</p>
                </div>

                <div className="toggle-switch">
                    <input type="checkbox" className='cb-toggle-switch'></input>
                    <label htmlFor="cb-toggle-switch"></label>
                </div>
            </section>
            <section className='section-notification'>
                <i className='icon-profile'></i>
                <div className="title-contents">
                    <h3>Notification</h3>
                    <p>Turn on the notifications to receive the latest updates.</p>
                </div>

                <div className="toggle-switch">
                    <input type="checkbox" className='cb-toggle-switch'></input>
                    <label htmlFor="cb-toggle-switch"></label>
                </div>
            </section>
            <section className='section-aboutus'>
                <i className='icon-profile'></i>
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
            <h2>Subscribe to Our <span className='blue-title'>Premium Plan</span></h2>
            <p>Unlimit your experience. Superchange your efficiency.</p>

            <div className="price-box">
                <div className="price">
                    <p>$</p>
                    <p className='blue-price'>19.95</p>
                    <p>/ month</p>
                </div>
                
                <button className='btn btn-primary'>Subscribe</button>
            </div>
            
            <h3>You can enjoy:</h3>
            <ul>
                <li><i className='icon-check'></i><span>Unlimited</span> Client Management</li>
                <li><i className='icon-check'></i><span>Unlimited</span> Note Entries</li>
                <li><i className='icon-check'></i>Create <span>Unlimited</span> Schedule entries</li>
                <li><i className='icon-check'></i>Search Connection information <span>by Keywords from Events, Connection, Emails, and Notes</span></li>    
            </ul>
        </section>
    </>

  )
}

export default AppSettings
