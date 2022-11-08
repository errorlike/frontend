import { useSelector, useDispatch } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm';
import { voteAction } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector(state => state);
  anecdotes.sort((first, second) => {
    return second.votes - first.votes;
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAction(id));
  };


  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App;