import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { UsersApi, User } from './client';

const api = new UsersApi({basePath : "http://localhost:8000/api"});

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    api.getUser(1).then(_user => setUser(_user));
  }, []);

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
