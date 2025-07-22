import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Button, Pagination, Modal, FormControl } from 'react-bootstrap';
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

// Normalizar ID's para mapear imágenes locales
function normalizeId(id) {
  if (!id) return '';
  return id.toLowerCase().split(':').pop().replace(/[-\s]/g, '_');
}

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
  const [searchTerm, setSearchTerm] = useState('');
  const [mobs, setMobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedMob, setSelectedMob] = useState(null);
  const MOBS_PER_PAGE = 16;
  const { addToCart } = useCart();
  const base = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    async function fetchMobs() {
      try {
        const res = await fetch(`${base}/mobsearch`);
        if (!res.ok) throw new Error('Error al solicitar la lista de mobs');
        const json = await res.json();
        const all = json.data || json;
        // Ya no filtramos, mostramos todos los mobs
        setMobs(all);
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

  // Filtrar según búsqueda
  const filtered = mobs.filter(mob =>
    mob.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / MOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * MOBS_PER_PAGE;
  const pageMobs = filtered.slice(startIndex, startIndex + MOBS_PER_PAGE);

  const handleOpenModal = mob => {
    setSelectedMob(mob);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMob(null);
  };

  return (
    <Container className="py-4">
      {/* Buscador */}
      <FormControl
        type="text"
        placeholder="Buscar mobs..."
        className="mb-4"
        value={searchTerm}
        onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
      />

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {pageMobs.map(mob => {
          const key = normalizeId(mob.identifier);
          const src = localMobImages[key] || mob.render_image || mob.head_image || '';
          return (
            <Col key={mob.id || mob.identifier}>
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
                    <Button
                      variant="success"
                      size="sm"
                      className="p-1"
                      style={{ minWidth: 'auto' }}
                      onClick={() => handleOpenModal(mob)}
                      aria-label={`Info de ${mob.name}`}
                    >
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
                      addToCart(mob.id || mob.identifier);
                      swal({ title: '¡Hecho!', text: `${mob.name} añadido al carrito correctamente.`, icon: 'success', button: 'Genial' });
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

      <Pagination className="justify-content-center mt-4">
        <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} />
        {[...Array(totalPages)].map((_, idx) => (
          <Pagination.Item
            key={idx + 1}
            active={idx + 1 === currentPage}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} />
      </Pagination>

      {/* Modal de información */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        {selectedMob && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedMob.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={6} className="d-flex flex-column align-items-center justify-content-center">
                  <img
                    src={selectedMob.render_image || localMobImages[normalizeId(selectedMob.identifier)] || selectedMob.head_image}
                    alt={selectedMob.name}
                    style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }}
                  />
                </Col>
                <Col md={6} className="d-flex flex-column align-items-center justify-content-center">
                  <img
                    src={selectedMob.head_image || localMobImages[normalizeId(selectedMob.identifier)]}
                    alt={`${selectedMob.name} head`}
                    style={{ maxHeight: '150px', maxWidth: '150px', objectFit: 'contain', marginBottom: '1rem' }}
                  />
                  <div><strong>Nombre:</strong> {selectedMob.name}</div>
                  <div><strong>Identificador:</strong> {selectedMob.identifier}</div>
                  <div><strong>ID:</strong> {selectedMob.id}</div>
                  <div><strong>Vida:</strong> {selectedMob.health}</div>
                  <div><strong>Ancho:</strong> {selectedMob.width}</div>
                  <div><strong>Alto:</strong> {selectedMob.height}</div>
                  <div><strong>Version ID:</strong> {selectedMob.version_id ?? 'N/A'}</div>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="success"
                onClick={() => {
                  addToCart(selectedMob.id || selectedMob.identifier);
                  swal({ title: '¡Hecho!', text: `${selectedMob.name} añadido al carrito correctamente.`, icon: 'success', button: 'Genial' });
                  handleCloseModal();
                }}
              >
                Agregar al carrito
              </Button>
              <Button variant="secondary" onClick={handleCloseModal}>Cerrar</Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
}
