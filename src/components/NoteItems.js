import { useContext } from "react";
import NoteContext from "../context/NoteContext";

const NoteItems = ({ note, updateNote }) => {
  const { onDelete } = useContext(NoteContext);

  return (
    <div className="note-card glassmorphic shadow-sm rounded p-4 position-relative">
      <div className="note-actions position-absolute top-0 end-0 p-2">
        <i
          className="fas fa-edit text-primary me-3 action-icon"
          onClick={() => updateNote(note)}
          title="Edit Note"
        ></i>
        <i
          className="fas fa-trash-alt text-danger action-icon"
          onClick={() => onDelete(note._id)}
          title="Delete Note"
        ></i>
      </div>
      <h5 className="note-title mb-2 fw-bold">{note.title}</h5>
      <p className="note-description">{note.description}</p>
      <div className="note-meta d-flex justify-content-between align-items-center mt-3">
        <span className="badge bg-primary">{note.tag}</span>
        <small className="text-muted">
          {new Date(note.date).toLocaleDateString()}
        </small>
      </div>
    </div>
  );
};

export default NoteItems;