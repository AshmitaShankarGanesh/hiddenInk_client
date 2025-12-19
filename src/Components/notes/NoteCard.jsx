import { Lock } from "lucide-react";

const NoteCard = ({ note }) => {
  return (
    <div className="border rounded-lg p-4 cursor-pointer hover:shadow dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-300">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold dark:text-white">{note.title}</h3>
        {note.isLocked && <Lock size={16} className="dark:text-gray-300" />}
      </div>

      {note.isLocked && (
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
          Locked note
        </p>
      )}
    </div>
  );
};

export default NoteCard;
