import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {

  state = {
    users: [],
  }

  async componentDidMount(){
    this.getUsers();
  }

  getUsers = async () => {
    const res = await axios.get('http://localhost:4000/api/users');
    this.setState({users: res.data});
  }

  onSubmit = async e => {
    e.preventDefault();
    const username = document.getElementById("newUserName");
    await axios.post('http://localhost:4000/api/users', {
      username: username.value
    })
    this.getUsers();
    username.value = '';
    
  }

  deleteUser = async (id) => {
    await axios.delete('http://localhost:4000/api/users/' + id)
    this.getUsers();
  }

  render() {
    return (
      <div className='row custom-bg'>

          <div className='col-md-4 p-5'>
              <h3>Create new user</h3>
              <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input type="text" className='form-control' id="newUserName" required/>
                </div>
                <button type="submit" className='btn btn-primary mt-3'>
                  Save
                </button>
              </form>
          </div>

          <div className='col-md-8'>
            <ul className='user-list'>
              {
                this.state.users.map(user => (
                  <li className='list-group-item list-group-item-action' key={user._id} 
                                      onDoubleClick={() => this.deleteUser(user._id)}>
                    {user.username}
                  </li>)
                )
              }
            </ul>
          </div>
          
      </div>
    )
  }
}
