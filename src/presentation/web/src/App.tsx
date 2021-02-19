import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useGetUser } from './client';

function App() {
  const { data : user } = useGetUser({ userId: 1, base: "http://localhost:8000/api" });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          <p>{user?.id}</p>
          <p>{user?.email}</p>
          <p>{user?.name}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
