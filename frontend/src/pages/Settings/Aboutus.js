import React from 'react'

//Credence img & LonkedIn & GitHub & World
import LinkedIn from "../../images/Setting/LinkedIn.svg";
import Github from "../../images/Setting/Github.svg";
import World from "../../images/Setting/Worldicon.svg";
//Team picture
import Gian from "../../images/Setting/Member/Gian.svg";
import Yuenki from "../../images/Setting/Member/Yuenki.svg";
import Joanne from "../../images/Setting/Member/Joanne.svg";
import Herlan from "../../images/Setting/Member/Herlan.svg";
import Danika from "../../images/Setting/Member/Danika.svg";
import Elmer from "../../images/Setting/Member/Elmer.svg";
import Keiko from "../../images/Setting/Member/Keiko.svg";
import Iris from "../../images/Setting/Member/Iris.svg";

const Aboutus = (props) => {
    const { aboutusIsOpen, onsetAboutusIsOpen} = props;

  const closepage = () => {
    onsetAboutusIsOpen(false)
  }  
  
    return (
    <section className='modal-aboutus'>
      <h2>Team The Planeteers</h2>
      

        <div className="members-box">
            <div className="member">
                <img src={Gian} alt="giancarlo cochella" className='image'/>
                <h3>Giancarlo Cochella</h3>
                <p>Design Lead/UX Writer</p>
                <div className="links-box">
                    <div><img src={LinkedIn} alt="linkedIn-icon" /><p> giancarlocochella</p></div>
                </div>
            </div>
            <div className="member">
                <img src={Yuenki} alt="yuen ki hung" className='image'/>
                <h3>Yuen Ki Hung</h3>
                <p>UX Lead</p>
                <div className="links-box">
                    <div><img src={LinkedIn} alt="linkedIn-icon" /><p> yuenki-hung</p></div>
                </div>
            </div>
            <div className="member">
                <img src={Joanne} alt="joanne Cho" className='image'/>
                <h3>Joanne Cho</h3>
                <p>Graphic & Product Designer</p>
                <div className="links-box">
                    <div><img src={LinkedIn} alt="linkedIn-icon" /><p> joanne-k-cho</p></div>
                </div>
            </div>
            <div className="member">
                <img src={Herlan} alt="herlan wijaya" className='image'/>
                <h3>Herlan Wijaya</h3>
                <p>UI Lead/Product Designer</p>
                <div className="links-box">
                    <div><img src={LinkedIn} alt="linkedIn-icon" /><p> herlanwijaya</p></div>
                </div>
            </div>
            <div className="member">
                <img src={Danika} alt="danika enad" className='image'/>
                <h3>Danika Enad</h3>
                <p>Project Manager/Full Stack Developer</p>
                <div className="links-box">
                    <div><img src={LinkedIn} alt="linkedIn-icon" /><p> danikaenad</p></div>
                    <div><img src={Github} alt="github-icon" /><p> denad00</p></div>
                </div>
            </div>
            <div className="member">
                <img src={Elmer} alt="elmer balbin" className='image'/>
                <h3>Elmer Balbin</h3>
                <p>Development Lead/Full Stack Developer</p>
                <div className="links-box">
                    <div><img src={LinkedIn} alt="linkedIn-icon" /><p> elmzarnsi</p></div>
                    <div><img src={Github} alt="github-icon" /><p> elmerdotdev</p></div>
                    <div><img src={World} alt="world-icon" /><p> elmer.dev</p></div>
                </div>
            </div>
            <div className="member">
                <img src={Keiko} alt="keiko shimizu" className='image'/>
                <h3>Keiko Shimizu</h3>
                <p>Full Stack Developer</p>
                <div className="links-box">
                    <div><img src={LinkedIn} alt="linkedIn-icon" /><p> keikoshimizu</p></div>
                    <div><img src={Github} alt="github-icon" /><p> keikoshimizu</p></div>
                </div>
            </div>
            <div className="member">
                <img src={Iris} alt="iris chen" className='image'/>
                <h3>Iris Chen</h3>
                <p>Full Stack Developer</p>
                <div className="links-box">
                        <div><img src={LinkedIn} alt="linkedIn-icon" /><p> iris-jiamin-chen</p></div>
                        <div><img src={Github} alt="github-icon" /><p> jaminitaa</p></div>
                </div>
            </div>
        </div>

      <div className="close-btn"><button onClick={closepage} className="btn btn-primary-reverse">Close</button></div>
    </section>
  )
}

export default Aboutus
