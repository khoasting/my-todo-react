
import React, { useState } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  updateTodo: (id: number, newTitle: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, removeTodo, updateTodo }) => {
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');

  const handleEditClick = (todo: Todo) => {
    setEditId(todo.id);
    setEditTitle(todo.title);
  };

  const handleUpdate = (id: number) => {
    if (editTitle.trim()) {
      updateTodo(id, editTitle);
      setEditId(null);
      setEditTitle('');
    }
  };

  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)} 
              className="checkbox" 
            />
            {editId === todo.id ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onBlur={() => handleUpdate(todo.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUpdate(todo.id);
                  }
                }}
                className="todo-input"
                autoFocus
              />
            ) : (
              <span
                className={todo.completed ? 'completed' : 'active'}
                onClick={() => handleEditClick(todo)}
              >
                {todo.title}
              </span>
            )}
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default TodoList;
