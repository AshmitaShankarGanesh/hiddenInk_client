import { useEffect, useState } from "react";
import axios from "axios";
import NoteCard from "./NoteCard";

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get("https://hiddenink-server-1jes.onrender.com/api/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotes(res.data);
    };

    fetchNotes();
  }, []);

  return (
    <div className="grid gap-4">
      {notes.map((note) => (
        <NoteCard key={note._id} note={note} />
      ))}
    </div>
  );
};

export default NotesList;
