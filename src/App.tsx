import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListPage from './modules/student/pages/ListPage';
import { Route, Switch } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/">
          <ListPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
