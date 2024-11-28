import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import viteLogo from '/vite.svg';
import reactLogo from './assets/react.svg';
import { server } from './common/server';
import './App.css';

const key = 'magic-number';

function App(): JSX.Element {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [key],
    // signal is passed into the fetch configuration so that we can cancel the fetch automatically, and when queryClient.cancelQueries is called
    queryFn: ({ signal }) =>
      server[key]
        .get({ fetch: { signal } })
        .then(({ data }) => data ?? undefined),
  });
  const mutation = useMutation({
    mutationFn: (magicNumber: number) => server[key].post({ magicNumber }),
    onMutate: async (magicNumber) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: [key] });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData([key]);

      // Optimistically update to the new value
      queryClient.setQueryData<{ magicNumber: number }>([key], (old) => ({
        ...old,
        magicNumber,
      }));

      // Return a context object with the previous value
      return { previousData };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (_, __, context) => {
      queryClient.setQueryData([key], context?.previousData);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });

  const magicNumber = query.data?.magicNumber ?? 0;

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
        <button type="button" onClick={() => mutation.mutate(magicNumber + 1)}>
          count is {query.isLoading ? 'loading...' : magicNumber}
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
