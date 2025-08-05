import { useContext, useState } from 'react';
import NoteContext from '../context/NoteContext';

const AddNotes = () => {
  const { addNote } = useContext(NoteContext);
  const [note, setNote] = useState({ title: '', description: '', tag: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (note.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters.';
    }
    if (note.description.trim().length < 5) {
      newErrors.description = 'Description must be at least 5 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    if (!validate()) return;
    addNote(note);
    setNote({ title: '', description: '', tag: '' }); // reset form
    setErrors({});
  };

  return (
    <form className="note-form p-4 shadow rounded mb-4 bg-body">
      <h4 className="mb-3">Add Note</h4>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          id="title"
          name="title"
          value={note.title}
          onChange={onChange}
          placeholder="Enter title"
        />
        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description <span className="text-danger">*</span>
        </label>
        <textarea
          className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          id="description"
          name="description"
          rows="3"
          value={note.description}
          onChange={onChange}
          placeholder="Enter description"
        ></textarea>
        {errors.description && <div className="invalid-feedback">{errors.description}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="tag" className="form-label">
          Tag
        </label>
        <input
          type="text"
          className="form-control"
          id="tag"
          name="tag"
          value={note.tag}
          onChange={onChange}
          placeholder="e.g. work, personal"
        />
      </div>

      <button
        type="button"
        className="btn btn-primary"
        onClick={handleClick}
        disabled={note.title.trim().length < 3 || note.description.trim().length < 5}
      >
        Save Note
      </button>
    </form>
  );
};

export default AddNotes;
