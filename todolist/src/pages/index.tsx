// pages/index.tsx
import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import Head from 'next/head';
import { v4 as uuidv4 } from 'uuid';
import { FiCheckCircle, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { MdOutlineTaskAlt } from 'react-icons/md';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  category: string;
  priority: string;
  completed: boolean;
}

const priorities = ['Low', 'Medium', 'High'];
const categories = ['Work', 'Personal', 'Study', 'Health'];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'completed'>>({
    title: '',
    description: '',
    dueDate: '',
    category: '',
    priority: 'Medium',
  });
  const [editId, setEditId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (!newTask.title.trim()) return;
    if (editId) {
      setTasks(tasks.map(task => task.id === editId ? { ...task, ...newTask } : task));
      setEditId(null);
    } else {
      setTasks([...tasks, { ...newTask, id: uuidv4(), completed: false }]);
    }
    setNewTask({ title: '', description: '', dueDate: '', category: '', priority: 'Medium' });
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEdit = (task: Task) => {
    setEditId(task.id);
    setNewTask({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      category: task.category,
      priority: task.priority,
    });
  };

  const toggleComplete = (id: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const sortedTasks = [...tasks].sort((a, b) => priorities.indexOf(b.priority) - priorities.indexOf(a.priority));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex flex-col items-center justify-start p-4 sm:p-6">
      <Head>
        <title>To-Do App List</title>
      </Head>

      <header className="text-center my-6 sm:my-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg flex items-center justify-center gap-2">
          <MdOutlineTaskAlt size={40} color="white" />
To-Do List
        </h1>
        <p className="text-white text-base sm:text-lg mt-2 font-medium">Organize, prioritize, and achieve more!</p>
      </header>

      <main className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-3xl space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            ref={inputRef}
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleChange}
            placeholder="Task title (e.g. Buy groceries)"
            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-500 text-gray-800"
          />

          <select
            name="priority"
            value={newTask.priority}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white text-gray-800"
          >
            <option value="" disabled className="text-gray-400">Select priority</option>
            {priorities.map(priority => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>

          <textarea
            name="description"
            value={newTask.description}
            onChange={handleChange}
            placeholder="Task description..."
            className="sm:col-span-2 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-500 text-gray-800"
          />

          <input
            type="date"
            name="dueDate"
            value={newTask.dueDate}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-800"
          />

          <select
            name="category"
            value={newTask.category}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white text-gray-800"
          >
            <option value="" disabled>Select category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <button
            onClick={handleAddOrUpdate}
            className="sm:col-span-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 text-white rounded-xl px-6 py-3 font-semibold shadow-md transition-all"
          >
            {editId ? 'Update Task' : 'Add Task'}
          </button>
        </div>

        <div className="space-y-4">
          {sortedTasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks yet. Start creating your productive day! ✨</p>
          ) : (
            sortedTasks.map(task => (
              <div
                key={task.id}
                className={`flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 rounded-2xl shadow-md hover:shadow-xl transition-all border ${
                  task.completed ? 'bg-green-100 border-green-400' : task.id === editId ? 'bg-yellow-100 border-yellow-400' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className={`${task.completed ? 'line-through opacity-70' : ''} space-y-1`}>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">{task.title}</h2>
                  <p className="text-sm text-gray-600 italic">{task.description}</p>
                  <p className="text-sm text-gray-500">Due: {task.dueDate || 'N/A'} | Category: {task.category || 'Uncategorized'}</p>
                  <p className={`text-sm font-semibold ${
                    task.priority === 'High' ? 'text-red-600' : task.priority === 'Medium' ? 'text-yellow-500' : 'text-green-600'
                  }`}>{task.priority} Priority</p>
                </div>

                <div className="flex gap-2 mt-4 sm:mt-0">
                  <button
                    onClick={() => toggleComplete(task.id)}
                    className={`${
                      task.completed ? 'bg-gray-400 hover:bg-gray-500' : 'bg-green-500 hover:bg-green-600'
                    } text-white px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-1`}
                  >
                    <FiCheckCircle /> {task.completed ? 'Undo' : 'Done'}
                  </button>

                  <button
                    onClick={() => handleEdit(task)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-1"
                  >
                    <FiEdit2 /> Edit
                  </button>

                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-1"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <footer className="text-white text-sm mt-8 opacity-90 text-center">Create your list with ease</footer>
    </div>
  );
}
