import React, { useState } from 'react';
import './App.css';
import TodoForm from './components/Todoform';
import ToPost from './components/ToPost';
import NavBar from './components/NavBar';

function App() {
  const [dark, setDark] = useState(false);
  const scrollToForm = () => {
    const el = document.getElementById('create-form');
    if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  };
  const onSearch = (q) => {
    const el = document.querySelector('.item');
    // Placeholder hook for future search integration
  };
  return (
    <div className={`App ${dark ? 'dark' : ''}`}>
      <NavBar dark={dark} setDark={setDark} onCreateClick={scrollToForm} onSearch={onSearch} />
      <h1 style={{display:'none'}}>Share your favorite story</h1>
      <p className="subtitle">Inspire others with moments that matter — add a title, your story, and an optional photo.</p>
       <ToPost/>
       <TodoForm />
       <button className="fab" onClick={scrollToForm} aria-label="Create Post">＋</button>
    </div>
  );
}

export default App;
