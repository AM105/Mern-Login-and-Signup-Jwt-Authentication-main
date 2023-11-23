import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import './Signup.css'

function Login() {
    const history=useNavigate();
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:8000/signup",{
             name,email,password
            })
            .then(res=>{
              alert("Data Save Sucessful")
              setName("");
              setEmail(""),
              setPassword("")
                if(res.data=="exist"){
                    alert("User already exists")
                }
                else if(res.data=="notexist"){
                    history("/Login")
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }

    }


    return (
        <div className="login">
        <h2>Signup</h2>
  
        <form onSubmit={submit}>
        <label htmlFor="email">Name:</label>
          <input
            type="name"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
  
        <Link to="/Login">Login Page</Link>
      </div>
    )
}

export default Login