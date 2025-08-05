import { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/NoteContext";
import NoteItems from "./NoteItems";
import AddNotes from "./AddNotes";
import { useNavigate } from "react-router-dom";

const Notes = () => {
    const { notes, fetchNotes, onEdit } = useContext(NoteContext);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    const ref = useRef(null);
    const refClose = useRef(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchNotes();
        } else {
            navigate('/login'); // Redirect to login if not authenticated
        }
    }, []);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag,
        });
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const handleClick = () => {
        refClose.current.click();
        onEdit(note.id, note.etitle, note.edescription, note.etag);
        setNote({ etitle: "", edescription: "", etag: "" });
    };

    const validate = () => {
        const newErrors = {};
        if (note.etitle.trim().length < 3) {
            newErrors.etitle = 'Title must be at least 3 characters.';
        }
        if (note.edescription.trim().length < 5) {
            newErrors.edescription = 'Description must be at least 5 characters.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <div className="notes-wrapper container py-5">
            <AddNotes />
            <button
                type="button"
                className="btn btn-primary d-none"
                ref={ref}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            ></button>
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content modal-glassmorphic">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Edit Note
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form className="note-form p-4 rounded">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">
                                        Title<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control glassmorphic-input"
                                        id="etitle"
                                        name="etitle"
                                        value={note.etitle || ""}
                                        placeholder="Enter title"
                                        required
                                        onChange={onChange}
                                    />
                                    {errors.etitle && <div className="invalid-feedback">{errors.etitle}</div>}

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">
                                        Description<span className="text-danger">*</span>
                                    </label>
                                    <textarea
                                        className="form-control glassmorphic-input"
                                        id="edescription"
                                        name="edescription"
                                        value={note.edescription || ""}
                                        rows="4"
                                        placeholder="Enter description"
                                        required
                                        onChange={onChange}
                                    ></textarea>
                                    {errors.edescription && <div className="invalid-feedback">{errors.edescription}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">
                                        Tag
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control glassmorphic-input"
                                        id="etag"
                                        name="etag"
                                        value={note.etag || ""}
                                        placeholder="e.g. work, personal"
                                        onChange={onChange}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                ref={refClose}
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>
                                Update Note
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="mb-4 text-center fw-bold">📓 Your Notes</h1>
            <div className="notes-grid">
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <NoteItems key={note._id} note={note} updateNote={updateNote} />
                    ))
                ) : (
                    <p className="text-center text-muted">No notes available.</p>
                )}
            </div>
        </div>
    );
};

export default Notes;