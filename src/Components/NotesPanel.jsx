import { useEffect, useState } from "react";
import axios from "axios";

export default function NotesPanel() {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState("all");

  const [selectedNote, setSelectedNote] = useState(null);
  const [editNote, setEditNote] = useState(null);

  const [unlockedContent, setUnlockedContent] = useState({});
  const [passwordNote, setPasswordNote] = useState(null);
  const [password, setPassword] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [lock, setLock] = useState(false);

  const token = localStorage.getItem("token");

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      if (!token) return;
      const res = await axios.get("https://hiddenink-server-1jes.onrender.com/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------------- FILTER ---------------- */
  const filteredNotes = notes.filter((note) => {
    if (filter === "locked") return note.isLocked;
    if (filter === "unlocked") return !note.isLocked;
    return true;
  });

  /* ---------------- VIEW ---------------- */
  const openNote = (note) => {
    if (note.isLocked && !unlockedContent[note._id]) {
      setPasswordNote(note);
      return;
    }
    setSelectedNote(note);
  };

  const closeView = () => {
    if (selectedNote?.isLocked) {
      setUnlockedContent((prev) => {
        const copy = { ...prev };
        delete copy[selectedNote._id]; // auto re-lock
        return copy;
      });
    }
    setSelectedNote(null);
  };

  /* ---------------- UNLOCK ---------------- */
  const unlockNote = async () => {
    try {
      const res = await axios.post(
        `https://hiddenink-server-1jes.onrender.com/api/notes/${passwordNote._id}/unlock`,
        { password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUnlockedContent((prev) => ({
        ...prev,
        [passwordNote._id]: res.data.content,
      }));

      setSelectedNote(passwordNote);
      setPasswordNote(null);
      setPassword("");
    } catch {
      alert("Wrong password");
    }
  };

  /* ---------------- EDIT ---------------- */
  const startEdit = () => {
    const note = selectedNote;
    setTitle(note.title);
    setContent(note.isLocked ? unlockedContent[note._id] : note.content);
    setLock(note.isLocked);
    setEditNote(note);
    setSelectedNote(null);
  };

  const updateNote = async () => {
    await axios.put(
      `https://hiddenink-server-1jes.onrender.com/api/notes/${editNote._id}`,
      { title, content, isLocked: lock },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setEditNote(null);
    fetchNotes();
  };

  /* ---------------- DELETE ---------------- */
  const deleteNote = async (id) => {
    await axios.delete(`https://hiddenink-server-1jes.onrender.com/api/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchNotes();
  };

  return (
    <div className="p-6">
      {/* FILTERS */}
      <div className="flex gap-3 mb-6">
        {["all", "locked", "unlocked"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1 rounded-full ${filter === f ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* NOTES */}
      {filteredNotes.map((note) => (
        <div
          key={note._id}
          className="border rounded-xl p-4 mb-4 cursor-pointer"
          onClick={() => openNote(note)}
        >
          <div className="font-semibold">{note.title}</div>
          {!note.isLocked && (
            <p className="text-sm text-gray-600 truncate">{note.content}</p>
          )}
          {note.isLocked && <p className="text-sm">🔒 Locked</p>}
          <button
            className="text-red-500 mt-2"
            onClick={(e) => {
              e.stopPropagation();
              deleteNote(note._id);
            }}
          >
            Delete
          </button>
        </div>
      ))}

      {/* VIEW MODAL */}
      {selectedNote && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[500px]">
            <h2 className="text-xl font-bold mb-2">{selectedNote.title}</h2>
            <p className="whitespace-pre-wrap mb-6">
              {selectedNote.isLocked
                ? unlockedContent[selectedNote._id]
                : selectedNote.content}
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={startEdit} className="bg-blue-600 text-white px-4 py-2 rounded">
                Edit
              </button>
              <button onClick={closeView} className="bg-gray-300 px-4 py-2 rounded">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PASSWORD MODAL */}
      {passwordNote && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[400px]">
            <h2 className="font-bold mb-4">Unlock note</h2>
            <input
              type="password"
              className="border w-full p-2 mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button onClick={unlockNote} className="bg-blue-600 text-white px-4 py-2 rounded">
                Unlock
              </button>
              <button onClick={() => setPasswordNote(null)} className="bg-gray-300 px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editNote && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[500px]">
            <h2 className="font-bold mb-4">Edit Note</h2>
            <input className="border w-full p-2 mb-3" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea className="border w-full p-2 h-40 mb-3" value={content} onChange={(e) => setContent(e.target.value)} />
            <label className="flex gap-2 mb-4">
              <input type="checkbox" checked={lock} onChange={(e) => setLock(e.target.checked)} />
              Lock this note
            </label>
            <div className="flex justify-end gap-3">
              <button onClick={updateNote} className="bg-blue-600 text-white px-4 py-2 rounded">
                Update
              </button>
              <button onClick={() => setEditNote(null)} className="bg-gray-300 px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
