import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { useCart } from '../components/CarritoContext';

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

  return id
    .toLowerCase()
    .split(':')
    .pop()
    .replace(/[\s-]/g, '_');
}

const ALL_MOBS = [
  'allay', 'axolotl', 'bat', 'camel', 'cat', 'chicken', 'cod', 'cow', 'donkey', 'frog', 'glow_squid',
  'horse', 'mooshroom', 'mule', 'ocelot', 'parrot', 'pig', 'pufferfish', 'rabbit', 'salmon', 'sheep',
  'skeleton_horse', 'sniffer', 'snow_golem', 'squid', 'strider', 'tadpole', 'tropical_fish', 'turtle',
  'villager', 'wandering_trader', 'bee', 'cave_spider', 'dolphin', 'drowned', 'enderman', 'fox', 'goat',
  'iron_golem', 'llama', 'panda', 'piglin', 'polar_bear', 'spider', 'trader_llama', 'wolf', 'zombified_piglin',
  'blaze', 'creeper', 'elder_guardian', 'endermite', 'evoker', 'ghast', 'guardian', 'hoglin', 'husk',
  'magma_cube', 'phantom', 'piglin_brute', 'pillager', 'ravager', 'shulker', 'silverfish', 'skeleton', 'slime',
  'stray', 'vex', 'vindicator', 'warden', 'witch', 'wither_skeleton', 'zoglin', 'zombie', 'zombie_villager',
  'ender_dragon', 'wither', 'armadillo', 'breeze'
];

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

export default function Mobs() {
  const [mobs, setMobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // obtenemos la función de añadir al carrito
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchMobs() {
      try {
        const data = await Promise.all(
          ALL_MOBS.map(name =>
            fetch(`/api/mob/${name}`)
              .then(res => {
                if (!res.ok) throw new Error(`No encontrado: ${name}`);
                return res.json();
              })
              .then(json => json.data)
          )
        );
        setMobs(data);
      } catch (err) {
        console.error(err);
        setError('Error al cargar los mobs.');
      } finally {
        setLoading(false);
      }
    }

    fetchMobs();
  }, []);

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
        {mobs.map(mob => {
          const key = normalizeId(mob.identifier);
          const src =
            localMobImages[key] || mob.render_image || mob.head_image || '';

          return (
            <Col key={mob.identifier}>
              <Card className="h-100 mob-card">
                <Card.Img
                  variant="top"
                  src={src}
                  alt={mob.name}
                  style={{ objectFit: 'contain', height: '150px' }}
                />

                <Card.Body>
                    <Card.Title>{mob.name}</Card.Title>

                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <div><strong>Vida:</strong> {mob.health}</div>
                        <div><strong>Dimensiones:</strong> {mob.width}×{mob.height}</div>
                      </div>

                      <Button variant="success"size="sm"className="p-1"style={{ minWidth: 'auto'}}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 9h.01" />
                          <path d="M11 12h1v4h1" />
                        </svg>
                      </Button>
                    </div>

                    <Button
                      variant="success"
                      className="w-100"
                      onClick={() => {
                        addToCart(mob.identifier);

                        // Muestro el SweetAlert
                        swal({
                          title: '¡Hecho!',
                          text: `${mob.name} añadido al carrito correctamente.`,
                          icon: 'success',
                          button: 'Genial'
                        });
                      }}
                    >
                      Agregar al carrito
                    </Button>
                </Card.Body>

              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}