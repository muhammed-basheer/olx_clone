import React, { useContext, useState } from 'react';
import { auth, db } from "../../firebase/config"; // Import db
import { FirebaseContext } from '../../store/Context';
import {signInWithEmailAndPassword} from "firebase/auth"
import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  async function loginHandle(e){
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth,email,password)
      navigate('/')
  } catch (error) {
      console.log(error)
  }
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={loginHandle}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=>navigate('/signup')}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
