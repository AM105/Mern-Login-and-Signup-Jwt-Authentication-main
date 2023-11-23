import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import './Login.css'

function Login() {

    const history=useNavigate();
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    async function submit(e) {
        e.preventDefault();

        try {
          const response = await axios.post("http://localhost:8000/login", {
            email,
            password,
          });

          const { status, message } = response.data;

          if (status === "success") {
            // User exists, navigate to home page
            history("/home");
          } else if (status === "notexist") {
            // User does not exist, show alert
            alert("User has not signed up");
          } else if (status === "incorrectpassword") {
            // Incorrect password, show alert
            alert("Incorrect password");
          } else {
            // Handle other cases or errors
            alert("Login failed");
          }
        } catch (error) {
          console.log(error);
          // Handle network or other errors
          alert("An error occurred while trying to log in");
        }
      }

    return (
        <div className="login">
        <h2>Login</h2>

        <form onSubmit={submit}>

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Submit</button>
        </form>

        <br />
        <p>OR</p>
        <br />

        <Link to="/signup">Signup</Link>
      </div>
    )
}

export default Login
