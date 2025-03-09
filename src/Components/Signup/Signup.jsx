import React, { useState } from "react";
import { auth, db } from "../../firebase/config"; 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; 
import { collection, addDoc } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";
import Logo from "../../olx-logo.png";
import olx_spinner from "../../../assets/images/olx_spinner.gif"
import "./Signup.css";

export default function Signup() {
  
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);


  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: username });

      await addDoc(collection(db, "users"), { 
        id: user.uid,
        username: username,
        phone: phone,
      });

      console.log("User signed up successfully!");
      navigate("/login"); 

    } catch (error) {
      console.error("Error signing up:", error.message);
    }
    setLoading(false)

  }

  return (
    loading?<div className="login_spinner">
    <img src={olx_spinner} alt="" />
  </div>:
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            name="phone"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
