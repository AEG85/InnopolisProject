import React from 'react'
import { Link, Routes, Route, NavLink } from 'react-router-dom'
import './assets/css/main-style.css'
import useScript from './hooks/useScript';

import { About, Place, Login, NotFound } from './pages'

import { useWindowSize } from './hooks/useWindowSize'
import { useDebounce } from './hooks/useDebounce'

const ROUTES = {
  about: '/',
  place: '/place',
  login: '/login'
}

const logo = {
  fontSize: '50px',
}

const footer = {
  borderTop: '1px solid rgba(23, 162, 184, 0.2)'
}

function App() {
  useScript('https://cdn.jsdelivr.net/npm/chart.js')
  const windowSize = useWindowSize()
  useDebounce(() => {
    console.log(windowSize)
  }, 2000, [windowSize])


  return (
    <>
      <div className="container-fluid bg-light position-relative shadow">
        <nav
          className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0 px-lg-5"
        >
          <Link
            to={ROUTES.about}
            className="navbar-brand font-weight-bold text-secondary"

          >
            <span style={logo} className="text-primary">ЧистыйГород</span>
          </Link>
          <button
            type="button"
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarCollapse"
          >
            <div className="navbar-nav font-weight-bold mx-auto py-0">
              <NavLink
                to={ROUTES.about}
                className="nav-item nav-link"
              > О сервисе</NavLink>
              <NavLink
                to={ROUTES.place}
                className="nav-item nav-link"
              > Информация по загрязненю</NavLink>
              <NavLink
                to={ROUTES.login}
                className="nav-item nav-link"
              > Авторизация / Регистраци</NavLink>
            </div>
          </div>
        </nav>
      </div>
      <Routes>
        <Route path={ROUTES.about} element={<About />}></Route>
        <Route path={ROUTES.place} element={<Place />}></Route>
        <Route path={ROUTES.login} element={<Login />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      {/* Navbar End */}

      {/* Footer Start */}
      <div
        className="container-fluid bg-secondary text-white mt-5 py-5 px-sm-3 px-md-5"
      >
        <div
          className="container-fluid pt-5"
          style={footer}
        >
          <p className="m-0 text-center text-white">
            &copy;
            <Link className="text-primary font-weight-bold" to={ROUTES.place}>Сервис анализа загрязненности местности</Link>.
            Все права защищены.
          </p>
        </div>
      </div >
      {/* Footer End */}

    </>

  );
}

export default App