// src/App.tsx

import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './TodoList';
import AddTodo from './AddTodo';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

type Filter = 'all' | 'completed' | 'notCompleted';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('notCompleted');  // Set default filter to 'notCompleted'

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    const newTodo = { id: Date.now(), title, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  const updateTodo = (id: number, newTitle: string) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, title: newTitle } : todo)));
  };
  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
  };

  const clearCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'notCompleted') return !todo.completed;
    return true;
  });

  const toggleAllTodos = () => {
    const allFilteredCompleted = filteredTodos.every(todo => todo.completed);
    const updatedTodos = todos.map(todo => {
      if (filteredTodos.some(filteredTodo => filteredTodo.id === todo.id)) {
        return { ...todo, completed: !allFilteredCompleted };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
 // Calculate the count of not completed todos
 const notCompletedCount = todos.filter(todo => !todo.completed).length;

  const toggleAllButtonText = filteredTodos.every(todo => todo.completed)
    ? 'Undo All'
    : 'Complete All';

  return (
    <div className="App">
      <h1>Todo App</h1>
      <AddTodo addTodo={addTodo} />
      <div className="items-left">Items Left: {notCompletedCount}</div>
      {/* Center-aligned Filter Buttons with 'Not Completed' in the Middle */}
      <div className="filter-buttons">
        <button
          onClick={() => handleFilterChange('all')}
          className={filter === 'all' ? 'active' : ''}
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange('notCompleted')}
          className={filter === 'notCompleted' ? 'active' : ''}
        >
          Not Completed
        </button>
        <button
          onClick={() => handleFilterChange('completed')}
          className={filter === 'completed' ? 'active' : ''}
        >
          Completed
        </button>
      </div>

      {/* Additional Buttons */}
      <div>
        <button onClick={toggleAllTodos}>{toggleAllButtonText}</button>
        <button onClick={clearCompletedTodos}>Clear Completed</button>
      </div>

      {/* Todo List */}
      <TodoList todos={filteredTodos} toggleTodo={toggleTodo} removeTodo={removeTodo} updateTodo={updateTodo}/>
    </div>
  );
};

export default App;
