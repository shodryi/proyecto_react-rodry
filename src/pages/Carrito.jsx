import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Button } from 'react-bootstrap';
import { useCart } from '../components/CarritoContext';

// Importar imagenes locales que no estan disponibles en la API
import breezeImg from '../assets/mobs/breeze.webp';
import creeperImg from '../assets/mobs/creeper.webp';
import donkeyImg from '../assets/mobs/donkey.webp';
import elder_guardianImg from '../assets/mobs/elder_guardian.webp';
import endermanImg from '../assets/mobs/enderman.webp';
import foxImg from '../assets/mobs/fox.webp';
import guardianImg from '../assets/mobs/guardian.webp';
import magma_cubeImg from '../assets/mobs/magma_cube.png';
import muleImg from '../assets/mobs/mule.webp';
import ocelotImg from '../assets/mobs/ocelot.webp';
import pigImg from '../assets/mobs/pig.png';
import piglin_bruteImg from '../assets/mobs/piglin_brute.png';
import polar_bearImg from '../assets/mobs/polar_bear.png';
import shulkerImg from '../assets/mobs/shulker.png';
import snow_golemImg from '../assets/mobs/snow_golem.png';
import turtleImg from '../assets/mobs/turtle.webp';
import villagerImg from '../assets/mobs/villager.webp';
import witchImg from '../assets/mobs/witch.webp';
import zoglinImg from '../assets/mobs/zoglin.webp';
import zombie_villagerImg from '../assets/mobs/zombie_villager.webp';

// Normalizar ID's
function normalizeId(id) {
  if (!id) return '';
  return id.toLowerCase().split(':').pop().replace(/[-\s]/g, '_');
}

// Map para imagenes locales
const localMobImages = {
  breeze: breezeImg,
  creeper: creeperImg,
  donkey: donkeyImg,
  elder_guardian: elder_guardianImg,
  enderman: endermanImg,
  fox: foxImg,
  guardian: guardianImg,
  magma_cube: magma_cubeImg,
  mule: muleImg,
  ocelot: ocelotImg,
  pig: pigImg,
  piglin_brute: piglin_bruteImg,
  polar_bear: polar_bearImg,
  shulker: shulkerImg,
  snow_golem: snow_golemImg,
  turtle: turtleImg,
  villager: villagerImg,
  witch: witchImg,
  zoglin: zoglinImg,
  zombie_villager: zombie_villagerImg
};

export default function Carrito() {
  const { cart, clearCart } = useCart();
  const entries = Object.entries(cart); // [ [mobId, qty], ... ]
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (entries.length === 0) {
      setItems([]);
      return;
    }
    setLoading(true);
    setError(null);

    Promise.all(
      entries.map(([mobId, qty]) =>
        fetch(`/api/mob/${mobId}`)
          .then(res => {
            if (!res.ok) throw new Error(`No encontrado: ${mobId}`);
            return res.json();
          })
          .then(json => ({ data: json.data, qty }))
      )
    )
      .then(results => {
        setItems(results);
      })
      .catch(err => {
        console.error(err);
        setError('Error al cargar los mobs.');
      })
      .finally(() => setLoading(false));
  }, [cart]);

  if (entries.length === 0) {
    return (
      <Container className="py-5">
        <Alert variant="info m-0">Tu carrito está vacío.</Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-5 m-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container className="py-4">
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {items.map(({ data: mob, qty }) => {
          const key = normalizeId(mob.identifier);
          const src = localMobImages[key] || mob.render_image || mob.head_image || '';

          return (
            <Col key={mob.identifier}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={src}
                  alt={mob.name}
                  style={{ objectFit: 'contain', height: '150px' }}
                />
                <Card.Body>
                  <Card.Title>{mob.name}</Card.Title>
                  <div><strong>Cantidad:</strong> {qty}</div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Botón para vaciar el carrito */}
      <div className="mt-3 text-center">
        <Button variant="danger" onClick={clearCart}>
          Vaciar Carrito
        </Button>
      </div>
    </Container>
  );
}
