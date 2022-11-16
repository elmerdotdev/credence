import React from 'react'
import { Link } from 'react-router-dom'

//Credence img & LonkedIn & GitHub & World
import credenceCRMcom from "../../images/Setting/credenceCRMcom.svg";
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
                <Link to="https://www.linkedin.com/in/giancarlocochella/"><img src={LinkedIn} alt="linkedIn-icon" /><p> giancarlocochella</p></Link>
            </div>
            <div className="member">
                <img src={Yuenki} alt="yuen ki hung" className='image'/>
                <h3>Yuen Ki Hung</h3>
                <p>UX Lead</p>
                <Link to="https://www.linkedin.com/in/yuenki-hung/"><img src={LinkedIn} alt="linkedIn-icon" /><p> yuenki-hung</p></Link>
            </div>
            <div className="member">
                <img src={Joanne} alt="joanne Cho" className='image'/>
                <h3>Joanne Cho</h3>
                <p>Visual Designer</p>
                <Link to="https://www.linkedin.com/in/joanne-k-cho/"><img src={LinkedIn} alt="linkedIn-icon" /><p> Joanne-k-cho</p></Link>
            </div>
            <div className="member">
                <img src={Herlan} alt="herlan wijaya" className='image'/>
                <h3>Herlan Wijaya</h3>
                <p>UI Lead</p>
                <Link to="https://www.linkedin.com/in/herlanwijaya/"><img src={LinkedIn} alt="linkedIn-icon" /><p> herlanwijaya</p></Link>
            </div>
            <div className="member">
                <img src={Danika} alt="danika enad" className='image'/>
                <h3>Danika Enad</h3>
                <p>PM/Full Stack Dev</p>
                <div className="links-box">
                    <Link to="https://www.linkedin.com/in/danikaenad/"><img src={LinkedIn} alt="linkedIn-icon" /><p> danikaenad</p></Link>
                    <Link to="https://github.com/denad00"><img src={Github} alt="github-icon" /><p> denadOO</p></Link>
                </div>
            </div>
            <div className="member">
                <img src={Elmer} alt="elmer balbin" className='image'/>
                <h3>Elmer Balbin</h3>
                <p>Dev Lead/Full Stack Dev</p>
                <div className="links-box">
                    <Link to="https://www.linkedin.com/in/elmzarnsi/"><img src={LinkedIn} alt="linkedIn-icon" /><p> elmzarnsi</p></Link>
                    <Link to="https://github.com/elmerdotdev"><img src={Github} alt="github-icon" /><p> elmerdotdev</p></Link>
                    <Link to=""><img src={World} alt="world-icon" /><p> elmer.dev</p></Link>
                </div>
            </div>
            <div className="member">
                <img src={Keiko} alt="keiko shimizu" className='image'/>
                <h3>Keiko Shimizu</h3>
                <p>Full Stack Dev</p>
                <div className="links-box">
                    <Link to="https://www.linkedin.com/in/keikoshimizu/"><img src={LinkedIn} alt="linkedIn-icon" /><p> keikoshimizu</p></Link>
                    <Link to="https://github.com/KeikoShimizu"><img src={Github} alt="github-icon" /><p> keikoshimizu</p></Link>
                </div>
            </div>
            <div className="member">
                <img src={Iris} alt="iris chen" className='image'/>
                <h3>Iris Chen</h3>
                <p>Full Stack Dev</p>
                <div className="links-box">
                    <Link to="https://www.linkedin.com/in/iris-jiamin-chen/"><img src={LinkedIn} alt="linkedIn-icon" /><p> iris-jamin-chen</p></Link>
                    <Link to="https://github.com/jaminitaa"><img src={Github} alt="github-icon" /><p> jiaminitaa</p></Link>
                </div>
            </div>
        </div>

      <div className="close-btn"><button onClick={closepage} className="btn btn-primary-reverse">Close</button></div>
      <div className="credence-tag"><img src={credenceCRMcom} alt="creednceCRM.com" /></div>  
    </section>
  )
}

export default Aboutus
