import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import anecdoteReducer from './reducers/anecdoteReducer';
import messageReducer from './reducers/messageReducer';
import timeIdReducer from './reducers/timeIdReducer';

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    message: messageReducer,
    timeId: timeIdReducer
  }
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
