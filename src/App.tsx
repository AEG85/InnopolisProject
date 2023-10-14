import React from 'react'
import { Link, Routes, Route, NavLink } from 'react-router-dom'
import './App.css';
// import { Login } from './pages'

import { About, Contacts, EventsCatalog, Main, NotFound } from './pages'
import { RequireAuth } from './hocs/requireAuth'

const ROUTES = {
  main: '/',
  catalog: '/catalog',
  about: '/about',
  contacts: '/contacts'
}

function App() {
  return (
    <div className="App">
      <header className="App-header1">
        <div>logo</div>
        <nav>
          <ul>
            <li><NavLink to={ROUTES.main} style={({ isActive }) => ({ color: isActive ? "green" : "dark" })}> Главная</NavLink></li>
            <li><NavLink to={ROUTES.catalog} style={({ isActive }) => ({ color: isActive ? "green" : "dark" })}> Каталог событий</NavLink></li>
            <li><NavLink to={ROUTES.about} style={({ isActive }) => ({ color: isActive ? "green" : "dark" })}> О проекте</NavLink></li>
            <li><NavLink to={ROUTES.contacts} style={({ isActive }) => ({ color: isActive ? "green" : "dark" })}> Контакты</NavLink></li>
          </ul>
        </nav>
        <div>
          <span>login / logout</span>
          <span>IcnoIser</span>
        </div>
      </header>
      <main>
        <Routes>
          <Route path={ROUTES.main} element={<Main />}></Route>
          <Route path={ROUTES.catalog} element={
            <RequireAuth>
              <EventsCatalog />
            </RequireAuth>
          }></Route>
          <Route path={ROUTES.about} element={<About />}></Route>
          <Route path={ROUTES.contacts} element={<Contacts />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </main>
    </div >


    // <div className="rootStyle">
    //   <Login />
    // </div>
  );
}

export default App;

{/* <div className="App">
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
</header>
</div> */}
