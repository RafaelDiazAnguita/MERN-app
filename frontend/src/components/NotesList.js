import React, { Component } from 'react'
import axios from 'axios'
import {format} from 'timeago.js'
import {Link} from 'react-router-dom'

export default class NotesList extends Component {

  state = {
    notes: []
  }

  componentDidMount(){
      this.getNotes();
  }

  getNotes = async () => {
      const res = await axios.get('http://localhost:4000/api/notes');
      this.setState({notes: res.data});
  }

  deleteNote = async (id) => {
      await axios.delete('http://localhost:4000/api/notes/' + id);
      this.getNotes();
  }


  render() {
    return (
      <div className='container mt-5'>
        <div className='row row-cols-3'>
          {
            this.state.notes.map(note => (
              <div className='col' key={note._id}>
                <div className='custom-card py-3 px-4'>

                  <div className='row'>
                    <div className='col-2'></div>
                    <div className='col-8'><h2 className='text-center mb-4'>{note.title}</h2></div>
                    <div className='col-2'><Link className='btn btn-secondary' to={"/edit/" + note._id}>edit</Link></div>
                  </div>
    
                  <h5>{note.author}</h5>
                  <p className='ms-2 note-content-view'>{note.content}</p>

                  <div className='row'>
                    <div className='col-md-6 date-col'>
                      <h6>{format(note.date)}</h6>
                    </div>
                    <div className='col-md-6 text-end'>
                      <button className='btn btn-danger mt-4' onClick={() => this.deleteNote(note._id)}>X</button>
                    </div>
                  </div>
          
                </div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}
