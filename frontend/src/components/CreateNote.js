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
      
      if(this.props.editId){
        const res = await axios.get('http://localhost:4000/api/notes/' + this.props.editId);
        const title = document.getElementById('noteTitle');
        const content = document.getElementById('noteContent');
        title.value = res.data.title;
        content.value = res.data.content;
        this.setState({
          editing:true
        });
      }
  }

   addNote = async e => {
     e.preventDefault();
     const title = document.getElementById('noteTitle');
     const content = document.getElementById('noteContent');

     console.log(sessionStorage['username']);
     const newNote = {
        title: title.value,
        content: content.value,
        date: this.state.date,
        author: sessionStorage['username']
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

  render() {
    return (
      <div className='custom-card py-5 px-5' id='note-creation'>
        <h3 className='mb-3'>Create new Note</h3>

        <form onSubmit={this.addNote}>

          <div className='form-group'>
            <input type="text" className='form-control' id="noteTitle" placeholder='Title...' required/>
            <textarea className='form-control' id="noteContent" placeholder='Content...' required/>
          </div>
          
          <div className='form-group mt-4'>
            <DatePicker 
              className='form-control'
              selected={this.state.date}
              onChange={this.onChangeDate}
              />
          </div>

          <button type="submit" className='btn btn-primary mt-3'>Save</button>
          
        </form>
      </div>
    )
  }
}

export default function CreateNoteExport(props) {
  const { id } = useParams();
  return <CreateNote {...props} editId={id} />
}