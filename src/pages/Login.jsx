import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, FormGroup } from 'react-bootstrap';
import logo from '../assets/img/logo-minecraft.svg';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('auth', 'true');
    navigate('/perfil/usuario123');
  };

  return (
    <Container className="py-6">
      <Row className="m-2 justify-content-center">
        <Col className='m-5' xs={12} md={6} lg={4}>
          <Card className="shadow-sm p-4">
            <Card.Img
              src={logo}
              alt="Minecraft Logo"
              style={{ width: '120px', display: 'block', margin: '0 auto 1rem' }}
            />
            <Card.Body>
              <Card.Title className="text-center mb-3">Iniciar sesión</Card.Title>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formUser">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control type="text" placeholder="Ingresa tu usuario" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Ingresa tu contraseña" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formRemember">
                  <Form.Check type="checkbox" label="Recuérdame" />
                </Form.Group>

                <Button variant="success" type="submit" className="w-100 py-2">
                  Entrar
                </Button>
              </Form>
              <div className="text-center mt-3">
                <a href="#" className="text-decoration-none">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
