import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CheckCircle2,
  Circle,
  ClipboardList,
  Pencil,
  X
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

/* ---------------- SORTABLE ITEM ---------------- */
const SortableTodoItem = ({
  item,
  toggleComplete,
  startEdit,
  saveEdit,
  editingId,
  editingText,
  setEditingText,
  deleteTodo
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.li
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`flex justify-between items-center
        px-4 py-3 rounded-lg
        ${item.completed
          ? "bg-green-50 dark:bg-green-900/30"
          : "bg-gray-100 dark:bg-gray-800"
        }`}
    >
      {/* LEFT */}
      <div className="flex items-center gap-3 flex-1">
        <button onClick={() => toggleComplete(item)}>
          {item.completed ? (
            <CheckCircle2 className="text-green-600" />
          ) : (
            <Circle className="text-gray-400" />
          )}
        </button>

        {editingId === item._id ? (
          <input
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") saveEdit(item._id);
              if (e.key === "Escape") setEditingId(null);
            }}
            className="flex-1 px-2 py-1 rounded border
                       bg-white dark:bg-gray-700
                       text-gray-900 dark:text-white"
          />
        ) : (
          <span
            onClick={() => toggleComplete(item)}
            className={`font-medium cursor-pointer
              ${item.completed
                ? "line-through text-gray-500"
                : "text-gray-900 dark:text-white"
              }`}
          >
            {item.todo}
          </span>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-3 ml-4">
        {editingId === item._id ? (
          <button
            onClick={() => saveEdit(item._id)}
            className="text-green-600 hover:underline"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => startEdit(item)}
            className="text-blue-600 hover:underline"
          >
            <Pencil size={16} />
          </button>
        )}

        <button
          onClick={() => deleteTodo(item)}
          className="text-red-600 hover:underline"
        >
          <X size={16} />
        </button>

        {/* DRAG HANDLE */}
        <span
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-400 select-none"
        >
          ☰
        </span>
      </div>
    </motion.li>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */
const TodoList = () => {
  const [todo, setTodo] = useState("");
  const [todoArray, setTodoArray] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [recentlyDeleted, setRecentlyDeleted] = useState(null);
  const [undoTimer, setUndoTimer] = useState(null);

  const token = localStorage.getItem("token");
  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const getTodo = async () => {
    const res = await axios.get(
      "https://hiddenink-server-1jes.onrender.com/api/todos",
      authHeader
    );
    setTodoArray(res.data);
  };

  const postTodo = async () => {
    if (!todo.trim()) return;

    await axios.post(
      "https://hiddenink-server-1jes.onrender.com/api/todos",
      { todo },
      authHeader
    );

    setTodo("");
    getTodo();
  };

  const deleteTodo = (item) => {
    setTodoArray(prev => prev.filter(t => t._id !== item._id));
    setRecentlyDeleted(item);

    const timer = setTimeout(async () => {
      await axios.delete(
        `https://hiddenink-server-1jes.onrender.com/api/todos/${item._id}`,
        authHeader
      );
      setRecentlyDeleted(null);
    }, 5000);

    setUndoTimer(timer);
  };

  const undoDelete = () => {
    clearTimeout(undoTimer);
    setTodoArray(prev => [recentlyDeleted, ...prev]);
    setRecentlyDeleted(null);
  };

  const toggleComplete = async (item) => {
    await axios.put(
      `https://hiddenink-server-1jes.onrender.com/api/todos/${item._id}`,
      { completed: !item.completed },
      authHeader
    );
    getTodo();
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setEditingText(item.todo);
  };

  const saveEdit = async (id) => {
    if (!editingText.trim()) return;

    await axios.put(
      `https://hiddenink-server-1jes.onrender.com/api/todos/${id}`,
      { todo: editingText },
      authHeader
    );

    setEditingId(null);
    setEditingText("");
    getTodo();
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;

    setTodoArray(items => {
      const oldIndex = items.findIndex(i => i._id === active.id);
      const newIndex = items.findIndex(i => i._id === over.id);

      const updated = [...items];
      const [moved] = updated.splice(oldIndex, 1);
      updated.splice(newIndex, 0, moved);

      return updated;
    });
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-6 bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Todo List
      </h2>

      {/* ADD */}
      <div className="flex gap-2 mb-6">
        <input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Add a todo..."
          className="flex-1 px-4 py-2 border rounded-lg
                     bg-white dark:bg-gray-800
                     text-gray-900 dark:text-white
                     placeholder-gray-400 dark:placeholder-gray-500"
        />
        <button
          onClick={postTodo}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg"
        >
          Add
        </button>
      </div>

      {/* EMPTY */}
      {todoArray.length === 0 && (
        <div className="flex flex-col items-center py-12 text-gray-500 dark:text-gray-400">
          <ClipboardList size={56} />
          <p className="mt-2">No todos yet</p>
        </div>
      )}

      {/* LIST */}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={todoArray.map(t => t._id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="space-y-3">
            <AnimatePresence>
              {todoArray.map(item => {
                console.log(item);
                return (
                  <SortableTodoItem
                    key={item._id}
                    item={item}
                    toggleComplete={toggleComplete}
                    startEdit={startEdit}
                    saveEdit={saveEdit}
                    editingId={editingId}
                    editingText={editingText}
                    setEditingText={setEditingText}
                    deleteTodo={deleteTodo}
                  />
                );
              })}

            </AnimatePresence>
          </ul>
        </SortableContext>
      </DndContext>

      {/* UNDO */}
      {recentlyDeleted && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2
                        bg-gray-900 text-white px-6 py-3 rounded-xl
                        flex gap-4 shadow-lg">
          <span>Todo deleted</span>
          <button onClick={undoDelete} className="text-blue-400">
            Undo
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoList;
