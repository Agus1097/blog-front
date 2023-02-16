import React from 'react';
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../actions/authAction';

export default function Navigation() {

  const loggedIn = useSelector(state => state.auth.auth.loggedIn);
  const user = useSelector(state => state.auth.auth.user);
  const dispatch = useDispatch();

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" className="mr-auto">
        <Navbar.Brand as={NavLink} to={"/"} className="ms-3 me-0">React JAVA</Navbar.Brand>
        <Navbar.Toggle className="me-3" aria-controls="main-menu"></Navbar.Toggle>
        <Navbar.Collapse className="ms-3" id="main-menu">
          <Nav>
            {loggedIn && <Nav.Link as={NavLink} to={"/newpost"}>Create Post</Nav.Link>}
          </Nav>
          <Nav className="ms-auto">
            {!loggedIn
              ? <React.Fragment>
                <Nav.Link as={NavLink} to={"/signup"}>Crear Cuenta</Nav.Link>
                <Nav.Link className="me-4" as={NavLink} to={"/signin"}>Iniciar Sesión</Nav.Link>
              </React.Fragment>
              : <NavDropdown className="me-4" align="end" title={user.nombre} id="menu-dropdown">
                <NavDropdown.Item as={NavLink} to={"/posts"}>Mis Posts</NavDropdown.Item>
                <NavDropdown.Item onClick={() => dispatch(logoutUser())}>Cerrar sesion</NavDropdown.Item>
              </NavDropdown>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}


