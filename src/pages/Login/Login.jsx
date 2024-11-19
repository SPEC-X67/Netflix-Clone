import './Login.css'
import logo from '../../assets/logo.png'
import { useState } from 'react'
import { login, signup } from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {

  const [signSate, SetSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);
    if(signSate === "Sign In") {
      await login(email, password);
    } else  {
      await signup(name, email, password);
    }
    setLoading(false)
  }

  return (
    loading?<div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className="login">
      <img src={logo} className='login-logo' alt="" />
      <div className="login-form">
        <h1>{signSate}</h1>
        <form >
          {signSate === "Sign Up" ? 
          <input value={name} onChange={(e) => (setName(e.target.value))} type="text" placeholder='Your name'/> : <></>}
          <input value={email} onChange={(e) => (setEmail(e.target.value))} type="email" placeholder='Email'/>
          <input value={password} onChange={(e) => (setPassword(e.target.value))} type="password" placeholder='Password'/>
          <button onClick={user_auth} type='submit'>{signSate}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox"/>
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signSate === "Sign In" ? <p>New to Netflix? <span onClick={() => {SetSignState("Sign Up")}}>Sign Up Now</span></p> :  <p>Already have account? <span onClick={() => {SetSignState("Sign In")}}>Sign In Now</span></p>}
        </div>
      </div>
    </div>
  )
}

export default Login
