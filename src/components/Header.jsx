// src/components/Header.jsx
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo-minecraft.svg';

export default function Header(){
  const navigate = useNavigate();
  const isAuth = localStorage.getItem('auth') === 'true';

  const cerrarSesion = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <Navbar className="py-3" style={{ backgroundColor: "#378039" }} variant="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} style={{ width:"195px" }} alt="Minecraft Logo" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link className="text-light" as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link className="text-light" as={Link} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link className="text-light" as={Link} to="/contacto">Contacto</Nav.Link>
            {isAuth && (
              <>
                <Nav.Link className="text-light" as={Link} to="/perfil/usuario123">Perfil</Nav.Link>
                <Nav.Link className="text-light" as={Link} to="/admin">Admin</Nav.Link>
              </>
            )}
          </Nav>

          <Nav className="align-items-center">
            {/* Carrito */}
            <Nav.Link as={Link} to="/carrito" className="text-light px-3">
             
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                >
                <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 17h-11v-14h-2" />
                <path d="M6 5l14 1l-1 7h-13" />
                </svg>


            </Nav.Link>

            {/* Login / Logout */}
            {!isAuth ? (
              <Button variant="outline-light" as={Link} to="/login">Login</Button>
            ) : (
              <Button variant="outline-light" onClick={cerrarSesion}>Cerrar sesión</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
