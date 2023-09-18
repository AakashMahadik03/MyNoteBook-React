import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => { 
    const notesInitial =[
        {
          "_id": "6504bf890707b795da005b6d",
          "user": "64ff78d79bf1d0555ebcec0c",
          "title": "new title updted 2",
          "description": "new description",
          "tag": "personal",
          "time": "2023-09-15T20:33:13.938Z",
          "__v": 0
        },
        {
          "_id": "6504bf890707b795da005b6d",
          "user": "64ff78d79bf1d0555ebcec0c",
          "title": "new title updted 2",
          "description": "new description",
          "tag": "personal",
          "time": "2023-09-15T20:33:13.938Z",
          "__v": 0
        },
        {
          "_id": "6504bf890707b795da005b6d",
          "user": "64ff78d79bf1d0555ebcec0c",
          "title": "new title updted 2",
          "description": "new description",
          "tag": "personal",
          "time": "2023-09-15T20:33:13.938Z",
          "__v": 0
        },
        {
          "_id": "6504bf890707b795da005b6d",
          "user": "64ff78d79bf1d0555ebcec0c",
          "title": "new title updted 2",
          "description": "new description",
          "tag": "personal",
          "time": "2023-09-15T20:33:13.938Z",
          "__v": 0
        },
        {
          "_id": "6504bf890707b795da005b6d",
          "user": "64ff78d79bf1d0555ebcec0c",
          "title": "new title updted 2",
          "description": "new description",
          "tag": "personal",
          "time": "2023-09-15T20:33:13.938Z",
          "__v": 0
        },
        {
          "_id": "6504bf890707b795da005b6d",
          "user": "64ff78d79bf1d0555ebcec0c",
          "title": "new title updted 2",
          "description": "new description",
          "tag": "personal",
          "time": "2023-09-15T20:33:13.938Z",
          "__v": 0
        },
        {
          "_id": "6504bf890707b795da005b6d",
          "user": "64ff78d79bf1d0555ebcec0c",
          "title": "new title updted 2",
          "description": "new description",
          "tag": "personal",
          "time": "2023-09-15T20:33:13.938Z",
          "__v": 0
        },
        {
          "_id": "6504bf890707b795da005b6d",
          "user": "64ff78d79bf1d0555ebcec0c",
          "title": "new title updted 2",
          "description": "new description",
          "tag": "personal",
          "time": "2023-09-15T20:33:13.938Z",
          "__v": 0
        },
      ]

      const [notes , setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{notes ,setNotes }}>
            {props.children} 
        </NoteContext.Provider>
    )
}

export default NoteState;
