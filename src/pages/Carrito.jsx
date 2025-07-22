import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Button, InputGroup, FormControl, Modal } from 'react-bootstrap';
import { useCart } from '../components/CarritoContext';

function normalizeId(id) {
  if (!id) return '';
  return id.toLowerCase().split(':').pop().replace(/[-\s]/g, '_');
}

const localMobImages = {
  // ... igual que antes
};

export default function Carrito() {
  const { cart, clearCart, updateQty } = useCart();  // <-- Usa updateQty, no setCart
  const entries = Object.entries(cart);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [mobToRemoveId, setMobToRemoveId] = useState(null);
  const [mobToRemoveName, setMobToRemoveName] = useState('');

  useEffect(() => {
    if (entries.length === 0) {
      setItems([]);
      return;
    }
    setLoading(true);
    setError(null);

    Promise.all(
      entries.map(([mobId, qty]) =>
        fetch(`/api/mobs/${mobId}`)
          .then(res => {
            if (!res.ok) throw new Error(`No encontrado: ${mobId}`);
            return res.json();
          })
          .then(json => {
            const mob = json.data || json;
            return { mob, qty };
          })
      )
    )
      .then(results => {
        setItems(results.filter(r => r.mob));
      })
      .catch(err => {
        console.error(err);
        setError('Error al cargar los mobs.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cart]);

  // Actualiza cantidad con la función del contexto updateQty
  function handleUpdateQty(mobId, newQty) {
    updateQty(mobId, newQty);
    // Actualiza localmente la lista para reflejar rápido el cambio
    if (newQty < 1) {
      setItems(prev => prev.filter(item => (item.mob.id || item.mob.identifier) !== mobId));
    } else {
      setItems(prev =>
        prev.map(item =>
          (item.mob.id || item.mob.identifier) === mobId
            ? { ...item, qty: newQty }
            : item
        )
      );
    }
  }

  function handleRemoveClick(mob) {
    const id = mob.mob.id || mob.mob.identifier;
    const name = mob.mob.name || '';
    setMobToRemoveId(id);
    setMobToRemoveName(name);
    setShowConfirmModal(true);
  }

  function confirmRemove() {
    if (!mobToRemoveId) return;
    // Aquí usamos updateQty para eliminar (qty = 0)
    updateQty(mobToRemoveId, 0);
    setShowConfirmModal(false);
    setMobToRemoveId(null);
    setMobToRemoveName('');
    // También actualizar localmente items
    setItems(prev => prev.filter(item => (item.mob.id || item.mob.identifier) !== mobToRemoveId));
  }

  function cancelRemove() {
    setShowConfirmModal(false);
    setMobToRemoveId(null);
    setMobToRemoveName('');
  }

  if (entries.length === 0) {
    return (
      <Container className="py-5">
        <Alert variant="info">Tu carrito está vacío.</Alert>
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
    <>
      <Container className="py-4">
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {items.map(({ mob, qty }) => {
            const key = normalizeId(mob.identifier);
            const src = localMobImages[key] || mob.render_image || mob.head_image || '';
            const mobId = mob.id || mob.identifier;

            return (
              <Col key={mobId}>
                <Card className="h-100">
                  <Card.Img
                    variant="top"
                    src={src}
                    alt={mob.name}
                    style={{ objectFit: 'contain', height: '150px' }}
                  />
                  <Card.Body>
                    <Card.Title>{mob.name}</Card.Title>
                    <InputGroup className="mb-3" style={{ maxWidth: '180px' }}>
                      <Button
                        variant="outline-secondary"
                        onClick={() => handleUpdateQty(mobId, qty - 1)}
                        disabled={qty <= 1}
                      >
                        -
                      </Button>
                      <FormControl
                        type="number"
                        value={qty}
                        min={1}
                        onChange={e => {
                          const val = Number(e.target.value);
                          if (isNaN(val) || val < 1) return;
                          handleUpdateQty(mobId, val);
                        }}
                        aria-label={`Cantidad de ${mob.name}`}
                        style={{ maxWidth: '40px', textAlign: 'center' }}
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => handleUpdateQty(mobId, qty + 1)}
                      >
                        +
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveClick({ mob, qty })}
                        style={{
                          marginLeft: '4px',
                          padding: '0 8px',
                          minWidth: '70px',
                          fontSize: '0.8rem',
                          height: '38px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        Eliminar
                      </Button>
                    </InputGroup>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>

        <div className="mt-3 text-center">
          <Button variant="danger" onClick={clearCart}>
            Vaciar Carrito
          </Button>
        </div>
      </Container>

      <Modal show={showConfirmModal} onHide={cancelRemove} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {mobToRemoveName && (
            <p>
              ¿Seguro que quieres eliminar <strong>{mobToRemoveName}</strong> de tu carrito?
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelRemove}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmRemove}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
