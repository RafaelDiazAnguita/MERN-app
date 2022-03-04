import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Navigation extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5">
      
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


        
        <form className="form-inline my-2 my-lg-0" id="search-form">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
        

      </nav>
    )
  }
}
