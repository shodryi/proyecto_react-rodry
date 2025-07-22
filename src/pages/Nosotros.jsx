import { Container, Row, Col, Card, Accordion, ListGroup } from 'react-bootstrap';

export default function Nosotros() {
  return (
    <Container style={{backgroundColor: "rgb(17 101 42)"}} className="p-5">
      {/* Título principal */}
      <Row style={{backgroundColor: "rgb(55, 128, 57)"}} className="mb-5 p-2">
        <Col>
          <h1 className="text-center text-light">Sobre Nosotros</h1>
          <p className="text-center text-light m-0">
            Conoce más acerca de nuestra misión y valores
          </p>
        </Col>
      </Row>

      {/* Historia */}
      <Row className="mb-4">
        <Col>
          <Card className="p-4">
            <Card.Title>Nuestra Historia</Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae eros at  
              urna fermentum malesuada. Phasellus sit amet libero in orci tincidunt  
              ullamcorper. Vivamus volutpat, justo eu porta pretium, risus sapien  
              tristique orci, vitae cursus nunc nisl non turpis. Donec nec lectus nec  
              velit commodo porttitor. Etiam sed dolor id arcu aliquet hendrerit. Phasellus sit amet libero in orci tincidunt  
              ullamcorper. Vivamus volutpat, justo eu porta pretium, risus sapien  
              tristique orci, vitae cursus nunc nisl non turpis. 
            </Card.Text>
          </Card>
        </Col>
      </Row>

      {/* Misión y Visión */}
      <Row className="mb-4">
        <Col md={6} className="mb-3">
          <Card className="h-100 p-3">
            <Card.Title>Misión</Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at velit  
              maximus, molestie est a, tempor magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae eros at  
              urna fermentum malesuada. Phasellus sit amet libero in orci tincidunt ullamcorper. Vivamus volutpat.
            </Card.Text>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100 p-3">
            <Card.Title>Visión</Card.Title>
            <Card.Text>
              Integer ac sem. Sed hendrerit lectus arcu, a cursus dui fermentum ac.  
              Cras ac velit nec turpis porta vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae eros at  
              urna fermentum malesuada. Phasellus sit amet libero in orci tincidunt amet libero in orci tincidunt ullamcorper. Cras ac velit nec turpis
            </Card.Text>
          </Card>
        </Col>
      </Row>

      {/* Valores */}
      <Row className="mb-4">
        <Col>
          <h2 className="mb-3 text-light">Nuestros Valores</h2>
          <Accordion defaultActiveKey="0">
            {[
              { key: '0', title: 'Integridad', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
              { key: '1', title: 'Innovación', body: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.' },
              { key: '2', title: 'Colaboración', body: 'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis.' },
            ].map(item => (
              <Accordion.Item eventKey={item.key} key={item.key}>
                <Accordion.Header>{item.title}</Accordion.Header>
                <Accordion.Body>{item.body}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>

      {/* Datos de Contacto */}
      <Row>
        <Col md={12}>
          <Card className="p-4 mb-3">
            <Card.Title>¿Queres Saber Más?</Card.Title>
            <Card.Text>
              Escríbinos y te contestaremos a la brevedad:
            </Card.Text>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Email:</strong> contacto@minecraftmobs.com</ListGroup.Item>
              <ListGroup.Item><strong>Teléfono:</strong> +54 9 11 1234-5678</ListGroup.Item>
              <ListGroup.Item><strong>Dirección:</strong> Calle Falsa 123, Buenos Aires, Argentina</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
