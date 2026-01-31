import { useEffect, useState } from "react";
import axios from "axios";

export default function NotesPanel() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editNote, setEditNote] = useState(null);
  const [createMode, setCreateMode] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [lock, setLock] = useState(false);
  const [lockPassword, setLockPassword] = useState("");

  const [unlockedContent, setUnlockedContent] = useState({});
  const [passwordNote, setPasswordNote] = useState(null);
  const [password, setPassword] = useState("");

  const token = localStorage.getItem("token");
  const API = "https://hiddenink-server-1jes.onrender.com/api/notes";

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await axios.get(API, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotes(res.data);
  };

  const resetState = () => {
    setTitle("");
    setContent("");
    setLock(false);
    setLockPassword("");
    setEditNote(null);
    setCreateMode(false);
    setSelectedNote(null);
  };

  const createNote = async () => {
    await axios.post(
      API,
      {
        title,
        content,
        isLocked: lock,
        password: lock ? lockPassword : null,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    resetState();
    fetchNotes();
  };

  const openNote = (note) => {
    if (note.isLocked && !unlockedContent[note._id]) {
      setPasswordNote(note);
      return;
    }
    setSelectedNote(note);
  };

  const unlockNote = async () => {
    try {
      const res = await axios.post(
        `${API}/${passwordNote._id}/unlock`,
        { password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUnlockedContent((prev) => ({
        ...prev,
        [passwordNote._id]: res.data.content,
      }));

      setSelectedNote(passwordNote);
      setPassword("");
      setPasswordNote(null);
    } catch (err) {
      alert("Wrong password");
    }
  };

  const startEdit = () => {
    setTitle(selectedNote.title);
    setContent(
      selectedNote.isLocked
        ? unlockedContent[selectedNote._id]
        : selectedNote.content
    );
    setLock(selectedNote.isLocked);
    setEditNote(selectedNote);
    setSelectedNote(null);
  };

  const updateNote = async () => {
    await axios.put(
      `${API}/${editNote._id}`,
      {
        title,
        content,
        isLocked: lock,
        newPassword: lock ? lockPassword : null,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    resetState();
    fetchNotes();
  };

  const deleteNote = async (noteId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this note?"
  );

  if (!confirmDelete) return;

  try {
    await axios.delete(`${API}/${noteId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // If the deleted note is open, close it
    if (selectedNote?._id === noteId) {
      setSelectedNote(null);
    }

    // Cleanup unlocked cache
    setUnlockedContent((prev) => {
      const copy = { ...prev };
      delete copy[noteId];
      return copy;
    });

    fetchNotes();
  } catch (err) {
    console.error(err);
    alert("Failed to delete note");
  }
};


  return (
    <div className="p-6 w-full relative z-10">
      <button
        type="button"
        onClick={() => setCreateMode(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        + Create
      </button>

      {/* NOTES LIST */}
      {notes.map((note) => (
        <div
          key={note._id}
          onClick={() => openNote(note)}
          className="border p-3 mb-2 cursor-pointer flex justify-between"
        >
          <span>{note.title}</span>
          {note.isLocked && <span>🔒</span>}
        </div>
      ))}

      {/* VIEW NOTE */}
{selectedNote && (
  <div className="border p-4 mt-4">
    <h2 className="font-bold mb-2">{selectedNote.title}</h2>

    <p className="mb-3">
      {selectedNote.content}
    </p>

    <div className="flex gap-2">
      <button
        onClick={startEdit}
        className="bg-yellow-500 px-3 py-1 rounded"
      >
        Edit
      </button>

      <button
        onClick={() => deleteNote(selectedNote._id)}
        className="bg-red-600 text-white px-3 py-1 rounded"
      >
        Delete
      </button>
    </div>
  </div>
)}


      {/* UNLOCK NOTE */}
      {passwordNote && (
        <div className="border p-4 mt-4">
          <h3 className="mb-2">Enter password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <button
            onClick={unlockNote}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Unlock
          </button>
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {(createMode || editNote) && (
        <div className="border p-4 mt-4">
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border w-full mb-2 px-2 py-1"
          />

          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border w-full mb-2 px-2 py-1"
          />

          <label className="block mb-2">
            <input
              type="checkbox"
              checked={lock}
              onChange={(e) => setLock(e.target.checked)}
            />{" "}
            Lock this note
          </label>

          {lock && (
            <input
              type="password"
              placeholder="Password"
              value={lockPassword}
              onChange={(e) => setLockPassword(e.target.value)}
              className="border w-full mb-2 px-2 py-1"
            />
          )}

          <button
            onClick={editNote ? updateNote : createNote}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editNote ? "Update" : "Create"}
          </button>
        </div>
      )}
    </div>
  );
}
