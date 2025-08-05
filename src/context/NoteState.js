
import { useState } from 'react';
import NoteContext from './NoteContext';
import SweetAlert from '../components/SweetAlert'; // Assuming SweetAlert is a component for alerts

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const token = localStorage.getItem('token');
    const [notes, setNotes] = useState([]);


    const fetchNotes = async () => {
        const response = await fetch(`${host}/api/v1/notes/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        });
        const json = await response.json();
        setNotes(json);

    }


    const addNote = async (note) => {
        const response = await fetch(`${host}/api/v1/notes/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify(note)
        });

        if (!response.ok) {
            SweetAlert.error("Failed to add note");
            return;
        }

        const json = await response.json();
        setNotes([...notes, json]);
        SweetAlert.success("Note added successfully");
    };

    const onDelete = async (id) => {
        const isConfirmed = await SweetAlert.confirm();
        if (isConfirmed) {
            const response = await fetch(`${host}/api/v1/notes/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                }
            });

            if (!response.ok) {
                SweetAlert.error("Failed to delete note");
                return;
            }
            setNotes(notes.filter(note => note._id !== id));
            SweetAlert.success(response.message || "Note deleted successfully");
        }
    }

    const onEdit = async (id, title, description, tag) => {

        const response = await fetch(`${host}/api/v1/notes/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify({ title, description, tag })
        });

        if (!response.ok) {
            SweetAlert.error("Failed to update note");
            return;
        }

        const updateNotes = notes.map(note => {
            if (note._id === id) {
                return { ...note, title, description, tag };
            }
            return note;
        })

        setNotes(updateNotes);
        SweetAlert.success("Note updated successfully");

    };

    return (
        <NoteContext.Provider value={{ notes, setNotes, onDelete, onEdit, addNote, fetchNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;