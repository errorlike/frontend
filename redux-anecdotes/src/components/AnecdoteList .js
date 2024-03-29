import { useDispatch, useSelector } from "react-redux";
import { voteAnecodte } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/messageReducer";

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes);
  const anecdotesSort = [...anecdotes];
  anecdotesSort.sort((first, second) => second.votes - first.votes);

  const dispatch = useDispatch();
  const vote = (anecdote) => {
    const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    };
    dispatch(voteAnecodte(changedAnecdote.id, changedAnecdote));
    const content = anecdote.content;
    dispatch(setNotification(`you voted ${content}`, 10));
  };
  return <div>
    {
      anecdotesSort.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )
    }
  </div>;

};
export default AnecdoteList;