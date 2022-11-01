import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '../Signup/hooks/useLogin'
import { useLogout } from '../Signup/hooks/useLogout' 
//Icon & Logo
import '../../fontello/css/credence.css';
import logo_nopadding from '../../images/logo_nopadding.svg';
import loginimage from '../../images/loginimage.svg'
// import setLastLoggedIn from '../Signup/Signup'
// import GoogleLoginButton from '../../components/GoogleLoginButton'

const Login = () => {
  //Email
  const [email, setEmail] = useState('');
  //Password
  const [password, setPassword] = useState('');
  //Password display( hide or show )
  const [pwShow, setPwShow] = useState(false);
  //Error checker
  const {login, error, isLoading} = useLogin();
  const { addLoginDate, lastLoggedIn } = useLogin()
  
  useEffect(() => {
    document.querySelector('body').removeAttribute("class")
    document.querySelector('body').classList.add('no-sidebar')
  }, [])

  //Login submit action 
  const navigate = useNavigate()
 
  const handleSubmit = async (e) => {
    e.preventDefault()

    //ここで入れる
    await  login(email, password)
    // await addLoginDate(lastLoggedIn)
    console.log(email, password)

    setEmail('')
    setPassword('')

    if (localStorage.getItem('user')) {  
      console.log('Successs Login!')
      navigate('/dashboard')
    } else {
      console.log(' No user into localstorage')
    }
  }

  //Password toggle
  const togglePw = () => {
    setPwShow(!pwShow)
  }

  //Logout submit action
  //dashboardできたらこれを入れてもらう
  const { logout } = useLogout()
  const handleLogout = () => {
      
    if(localStorage.getItem('user')){
      logout()
      navigate('/login')
      console.log('Logout')
    }else{
      return null
    }
    
  }

  return (
    <div className="page-login">
      <section className="page-login-area">
        <i className='icon-close'></i>
        <h3>Sign into your <img src={logo_nopadding} alt="credence-logo" className='credence-logo'/> account</h3>

        <div className="desktop-grid">
          <div>
            <img src={loginimage} alt="login-img" className='login-img'/>
          </div>
          <div className="right-box">
            <form className="login-form" onSubmit={handleSubmit}>
              <label  htmlFor="email" name="email" >Email</label>
              <input  type="email"
                      htmlFor="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
              />
              <label  htmlFor="password">Password</label>
              <div className="password-area">
                <input  type={ pwShow ? "text": "password"}
                        htmlFor="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
          
                />
                <i  className={pwShow === true ? "icon-lock" : "icon-info"}
                    onClick={togglePw}
                >
                </i>
              </div>
          
              {error && <div className='error'>{error}</div>}
              <input type="submit" value="Login" className="submit-login-btn" />
            </form>
          
              <div className="fgt-pwd-box">
                <Link className="forget-pw-link">Forgotten your password?</Link>
              </div>
            {/* <div>OR</div> */}
            {/* <GoogleLoginButton/> */}
          
            <p className="move-to-signup-link">Don't have an account? <Link to='/signup'>Sign up here</Link></p>
          </div>
        </div>

        <button onClick={handleLogout} type={"submit"}>logout</button>
      </section>
    </div>
  )
}

export default Login