import React, { useState } from 'react';
import Header from './components/Header';
import ToDo from './components/ToDo';
import Auth from './components/Auth';
import AuthContext from './auth-context';

const App = (props) => {
  const [page, setPage] = useState('auth');
  const [authStatus, setAuthStatus] = useState(false);

  function switchPage(newPage) {
    setPage(newPage);
  }

  const login = () => {
    setAuthStatus(true);
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{
        status: authStatus,
        login: login
      }}>
        <Header onLoadTodo={switchPage.bind(this, 'todos')} onLoadAuth={switchPage.bind(this, 'auth')} />
        <hr />
        {page === 'auth' ? <Auth /> : <ToDo />}
      </AuthContext.Provider>
    </div>
  );
}

export default App;
