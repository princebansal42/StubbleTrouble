import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './auth.css';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [type, setType] = useState("op1");


  const handleSubmit = e => {
        e.preventDefault();

  };
  return(
    <div class="container">
        <div class="z-depth-1 grey lighten-4 row" style="display: inline-block; padding: 32px 48px 0px 48px; border: 1px solid #EEE;">

          <form class="col s12" method="post" onSubmit={e => handleSubmit(e)}>
            <div class='row'>
              <div class='col s12'>
              </div>
            </div>

            <div class='row'>
              <div class='input-field col s12'>
                <input class='validate' type='email' name='email' id='email' onChange={e => setEmail(e.target.value)} />
                <label for='email'>Enter your email</label>
              </div>
            </div>

            <div class='row'>
              <div class='input-field col s12'>
                <input class='validate' type='text' name='name' id='username' onChange={e => setUsername(e.target.value)}/>
                <label for='email'>Enter your username</label>
              </div>
            </div>

            <div class='row'>
              <div class='input-field col s12'>
                <input class='validate' type='password' name='password' id='password' onChange={e => setPassword(e.target.value)}/>
                <label for='password'>Enter your password</label>
              </div>
            </div>

            <div class='row'>
              <form >
                <p>
                  <label>
                    <input name="group1" type="radio" value="op1" checked={count == "op1"} onChange={e => setType(e.target.value)}/>
                    <span>Farmer</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input name="group1" type="radio" value="op2" checked={count == "op2"} onChange={e => setType(e.target.value)}/>
                    <span>Buyer</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input name="group1" type="radio" value="op3" checked={count == "op3"} onChange={e => setType(e.target.value)}/>
                    <span>Logistics</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input name="group1" type="radio" value="op4"checked={count == "op4"}  onChange={e => setType(e.target.value)}/>
                    <span>Admin</span>
                  </label>
                </p>
              </form>
            </div>

            <br />
            <center>
              <div class='row'>
                <button type='submit' name='btn_login' class='col s12 btn btn-large waves-effect indigo'>Login</button>
              </div>
            </center>
          </form>
        </div>
      </div>
  )
}


export default Register;
