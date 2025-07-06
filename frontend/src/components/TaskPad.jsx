import React, { useEffect, useState } from 'react';
import API from '../api';

function TaskPad() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTasks = async () => {
    const res = await API.get('tasks/');
    setTasks(res.data);
  };

  const addTask = async () => {
    if (title.trim()) {
      await API.post('tasks/', { title });
      setTitle('');
      fetchTasks();
    }
  };

  const toggleTask = async (task) => {
    await API.put(`tasks/${task.id}/`, {
      ...task,
      completed: !task.completed,
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>TaskPad</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New Task" />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id} onClick={() => toggleTask(task)} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskPad;
