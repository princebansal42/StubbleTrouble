import React from 'react';
import {Link} from 'react-router-dom';

const Navbar=(props)=>{
  return(
    <div>
      <nav>
        <div class="nav-wrapper">
        <div class="brand-logo"><Link to="/home">HOME</Link></div>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><Link to='/login'>LOGIN</Link></li>
          <li><Link to='/signup'>SIGN UP</Link></li>
        </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;
