import useSWR from 'swr';
import viteLogo from '/vite.svg';
import reactLogo from './assets/react.svg';
import { server } from './common/server';
import './App.css';

function App(): JSX.Element {
  const { data, mutate, isLoading } = useSWR('magic-number', (key) =>
    server[key].get().then((res) => res.data ?? undefined)
  );

  const magicNumber = data?.magicNumber ?? 0;

  async function incrementNumber(): Promise<void> {
    await server['magic-number'].post({ magicNumber: magicNumber + 1 });
    mutate({ magicNumber: magicNumber + 1 }, true);
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button type="button" onClick={incrementNumber}>
          count is {isLoading ? 'loading...' : magicNumber}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
