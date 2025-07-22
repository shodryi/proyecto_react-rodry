import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import logo from '../assets/img/logo-minecraft.svg';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Validar que no estén vacíos
    if (!username.trim() || !password.trim()) {
      setError('Por favor completa ambos campos.');
      return;
    }
    // Limpio posible error
    setError('');
    // En entorno de prueba, cualquier credencial válida
    localStorage.setItem('auth', 'true');
    navigate('/perfil/admin');
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

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleLogin} noValidate>
                <Form.Group className="mb-3" controlId="formUser">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Ingresa tu usuario"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
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
