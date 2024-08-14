import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/configureStore';
import Login from './components/Login/Login';
import UserList from './components/UsersList/UsersList';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Login />
        <UserList />
      </div>
    </Provider>
  );
}

export default App;
