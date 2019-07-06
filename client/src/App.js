import React from 'react';

import TodosList from './components/todos-list';
import UpdateTodo from './components/update-todo';
import CreateTodo from './components/create-todo';
import DeleteTodo from './components/delete-todo';

import {BrowserRouter as Router, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import logo from './logo.png';

function App() {
  return (
      <Router>
        <div className='container'> 
          <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <a className='navbar-brand' href='http://localhost:3000/'>
              <img src={logo} width='30' height='30' alt='todoListApp'>
              </img>
            </a>
            <div>
              <ul className='navbar-nav mr-auto'>
                <li className='navbar-item'>
                  <Link to='/' className='nav-link'> Todos </Link>
                </li>
                <li>
                  <Link to='/create' className='nav-link'> Create </Link>
                </li>
              </ul>
            </div>
          </nav>
          <Route path='/' exact component={TodosList} />
          <Route path='/update/:id' exact component={UpdateTodo} />
          <Route path='/delete/:id' exact component={DeleteTodo} />
          <Route path='/create' exact component={CreateTodo} />
        </div>
      </Router>
  );
}

export default App;
