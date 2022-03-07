import React, { Component } from 'react'
import axios from 'axios';

export default class LogIn extends Component {

    handleSubmit = async e => {
        e.preventDefault();
        const res = await axios.post('http://localhost:4000/api/users/'+this.username,{
            password: this.password
        });
        const {message} = res.data;
        if(message === 'Logged'){
            sessionStorage.logged = true;
            sessionStorage.username = this.username;
            window.location.href = '/';
        }
        else
            alert(message);
      }

  render() {
    return (
        <div className='container'>
        <form className='custom-card p-5' id='sign-up-form' onSubmit={this.handleSubmit}>
          
          <h3 className='mb-3'>Log into your account</h3>

          <div className='form-group'>

            <input type='text' className='form-control mb-3' required placeholder='username'
                  onChange={ e => this.username = e.target.value }/>
            <input type='password' className='form-control mb-3' required placeholder='password'
                  onChange={ e => this.password = e.target.value }/>

          </div>

          <button className='btn btn-primary' type='submit'>Log In</button>
        
        </form>
      </div>
    )
  }
}
