import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/img/logo-minecraft.svg';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleInicioClick = e => {
    e.preventDefault();
    if (location.pathname === '/' || location.pathname === '/mobs') {
      // Si estoy en la página principal,hago scroll al top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Si estoy en otra ruta, navega a la principal
      navigate('/');
    }
  };

  return (
    <footer style={{ backgroundColor: '#378039' }}>
      <Container className='p-3'>
        <Row>
          <Col md={4} className='d-flex flex-column align-items-center justify-content-center gap-3 mb-3'>
            <img src={logo} style={{ width: '195px' }} alt='Minecraft Logo' />
            <p className='text-center text-light'>
              Aquí los mobs de tu videojuego de cubitos favorito.
            </p>
          </Col>

          <Col md={4} className='mb-3'>
            <h5 className='text-light bold'>Enlaces útiles</h5>
            <Nav className='flex-column'>
              <Nav.Link
                href='#'
                className='text-light px-0'
                onClick={handleInicioClick}
              >
                Inicio
              </Nav.Link>

              <Nav.Link className='text-light px-0' as={Link} to='/nosotros'>
                Nosotros
              </Nav.Link>
              <Nav.Link className='text-light px-0' as={Link} to='/contacto'>
                Contacto
              </Nav.Link>
            </Nav>
          </Col>

          <Col className='mb-3 d-flex row w-auto'>
            <h5 className='text-light'>Síguenos</h5>
            <Nav className='d-flex flex-column gap-1'>
              {/* Facebook */}
              <Nav.Link href='#' className='text-light px-2'>
                {/* SVG icon */}
                Facebook
              </Nav.Link>
              {/* Twitter */}
              <Nav.Link href='#' className='text-light px-2'>
                {/* SVG icon */}
                Twitter
              </Nav.Link>
              {/* Instagram */}
              <Nav.Link href='#' className='text-light px-2'>
                {/* SVG icon */}
                Instagram
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
        <Row className='pt-3 border-top'>
          <Col className='text-center'>
            <small className='text-light'>&copy; {new Date().getFullYear()} Minecraft Mobs. Todos los derechos reservados.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
