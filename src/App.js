import React from 'react';
import './App.css';
import TodoForm from './components/Todoform';
import ToPost from './components/ToPost';

function App() {
  return (
    <div className="App">
      <h1>Share your fav story with us ^^</h1>
       <ToPost/>
       <TodoForm />
    </div>
  );
}

export default App;
