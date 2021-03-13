
import logo from './logo.svg';
import './App.css';
import { useGetUser } from './client';

function App() {
  const { data, refetch, loading, error } = useGetUser({ userId: 1})

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
        {
          error ? <span>Error {error.data}</span>
                : loading
                    ? <span>Loading...</span>
                    : <span>{data?.mail}</span>
        }
        <button onClick={() => refetch()}> Refetch </button>
      </header>
    </div>
  );
}

export default App;
