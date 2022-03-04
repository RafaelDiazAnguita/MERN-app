import axios from 'axios'
import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useParams } from 'react-router-dom';

class CreateNote extends Component {

  state = {
    users: [],
    date: new Date(),
    editing: false
  }

  async componentDidMount(){

      this.getUsers();
      
      if(this.props.editId){
        const res = await axios.get('http://localhost:4000/api/notes/' + this.props.editId);
        const title = document.getElementById('noteTitle');
        const content = document.getElementById('noteContent');
        const author = document.getElementById('noteAuthor');
        title.value = res.data.title;
        content.value = res.data.content;
        author.value = res.data.author;
        this.setState({
          editing:true
        });
      }
  }

   addNote = async e => {
     e.preventDefault();
     const title = document.getElementById('noteTitle');
     const content = document.getElementById('noteContent');
     const author = document.getElementById('noteAuthor');

     const newNote = {
        title: title.value,
        content: content.value,
        date: this.state.date,
        author: author.value
     }

     if(this.state.editing){
      await axios.put('http://localhost:4000/api/notes/'+this.props.editId,newNote)
     }
     else{
      await axios.post('http://localhost:4000/api/notes/',newNote);
     }  
  
    window.location.href = '/';
  }

  onChangeDate = newdate => {
    this.setState({date: newdate});
  }

  getUsers = async () => {
    const res = await axios.get('http://localhost:4000/api/users');
    this.setState({users: res.data});
  }

  render() {
    return (
      <div className='custom-card py-5 px-5' id='note-creation'>
        <h3 className='mb-3'>Create new Note</h3>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text">Users</label>
          </div>
          <select className="custom-select" id="noteAuthor">
            {
              this.state.users.map( user => <option value={user.username} key={user._id}>{user.username}</option>)
            }
          </select>
        </div>

        <form onSubmit={this.addNote}>

          <div className='form-group'>
            <input type="text" className='form-control' id="noteTitle" placeholder='Title...' required/>
            <textarea className='form-control' id="noteContent" placeholder='Content...' required/>
          </div>
          
          <div className='form-group'>
            <DatePicker 
              className='form-control'
              selected={this.state.date}
              onChange={this.onChangeDate}
              />
          </div>

          <button type="submit" className='btn btn-primary mt-3'>
            Save
          </button>
        </form>
      </div>
    )
  }
}

export default function CreateNoteExport(props) {
  const { id } = useParams();
  return <CreateNote {...props} editId={id} />
}