import NoteContext from "./noteContext";
import { useState, } from "react"; 

const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const notesInitial = []
          const [notes, setNotes] = useState(notesInitial)
          const getNotes = async()=>{
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
              method: 'GET', 
              
              headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage .getItem('token')
              }
            });
            const json = await response.json()
            setNotes(json)
          }

          const addNote = async(title, description, tag)=>{
            const response = await fetch(`${host}/api/notes/addnote`, {
              method: 'POST', 
              
              headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
              },
           
              body: JSON.stringify({title,description,tag}) 
            });
            const json = response.json(); 

            console.log("Adding a new Note")
            const note = {
              "_id": "63d3f4e6f7eebbd1ac4e99d4205",
              "user": "63d37f1b742bbfcb2f5d890b",
              "title": title,
              "description": description,
              "tag": tag,
              "date": "2023-01-27T16:40:15.065Z",
              "__v": 0
            };
            setNotes(notes.concat(note))
          }
          const deleteNote= async(id) =>{
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
              }
            });
            const json = response.json();
            console.log(json)

            const newNotes = notes.filter((note)=>{return note._id!==id})
            setNotes(newNotes)
          }
          const editNote = async(id, title, description, tag)=>{
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
              method: 'PUT', 
              
              headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
              },
           
              body: JSON.stringify({title, description, tag}) 
            });
            const json = await response.json();
            console.log(json)
            let newNotes = JSON.parse(JSON.stringify(notes))

            for(let index = 0; index < notes.length; index++){
              const element = notes[index];
              if(element._id === id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag; 
                break; 
            }
          }
          setNotes(newNotes);

        }
    

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;