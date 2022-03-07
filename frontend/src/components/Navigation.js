import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Navigation extends Component {

  logOut = () => {
    delete sessionStorage.logged;
    window.location.href = '/';
  }

  renderNav = () => {
    if(sessionStorage['logged']){
      return <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5">
      
      <Link className="navbar-brand" to='/'>NotesApp</Link> 

      <div id="navbarSupportedContent">

        <ul className="navbar-nav mr-auto">

          <li className="nav-item active">
            <Link className="nav-link" to='/'>Notes</Link> 
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to='/create'>Create Note</Link> 
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to='/user'>Create User</Link> 
          </li>
        
        </ul>
      </div>


      
      <div className='auth-menu'>
        <ul className="navbar-nav mr-auto">

          <li className="nav-item active">
            <span className='nav-link make-pointer' onClick={this.logOut}>Log Out</span>
          </li>
        
        </ul>
      </div>
      

      </nav>
    }
    else{
      return <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5">
      
      <Link className="navbar-brand" to='/'>NotesApp</Link> 

      <div id="navbarSupportedContent">
      </div>
  
      <div className='auth-menu'>
        <ul className="navbar-nav mr-auto">

          <li className="nav-item active">
            <Link className="nav-link" to='/login'>Log in</Link> 
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to='/signup'>Sign Up</Link> 
          </li>

        </ul>
      </div>
      

      </nav>
    }
  }

  render() {
    return (
      this.renderNav()
    )
  }
}
