import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form, Alert, Spinner } from 'react-bootstrap';

export default function MobAdmin() {
  const [mobs, setMobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [mobToDelete, setMobToDelete] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', health: '', width: '', height: '' });

  const base = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchList();
  }, []);

  function fetchList() {
    setLoading(true);
    fetch(`${base}/mobsearch`)
      .then(r => r.json())
      .then(j => setMobs(j.data || j))
      .catch(() => setError('Error al cargar'))
      .finally(() => setLoading(false));
  }

  function handleShow(mob) {
    if (mob) {
      setEditing(mob);
      setForm({ name: mob.name, health: mob.health, width: mob.width, height: mob.height });
    } else {
      setEditing(null);
      setForm({ name: '', health: '', width: '', height: '' });
    }
    setShowModal(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function handleSubmit() {
    const { name, health, width, height } = form;
    if (!name || health <= 0 || height <= 0 || width <= 0) return alert('Revisa los campos');
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `/api/mobs/${editing.id}` : '/api/mobs';
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, health, width, height })
    })
      .then(() => {
        setShowModal(false);
        fetchList();
      })
      .catch(() => setError('Error al guardar'));
  }

  function confirmDelete(mob) {
    setMobToDelete(mob);
    setShowDeleteModal(true);
  }

  function handleDelete() {
    if (!mobToDelete) return;
    fetch(`${base}/mobsearch/${mobToDelete.id}`, { method: 'DELETE' })
      .then(() => {
        setShowDeleteModal(false);
        setMobToDelete(null);
        fetchList();
      })
      .catch(() => {
        setError('Error al eliminar');
        setShowDeleteModal(false);
      });
  }

  if (loading) return <Spinner animation="border" />;

  return (
    <Container>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button className="my-4" onClick={() => handleShow(null)}>Agregar Mob</Button>
      <Table striped>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Vida</th>
            <th>Dimensiones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mobs.map(m => (
            <tr key={m.id}>
              <td>{m.name}</td>
              <td>{m.health}</td>
              <td>{m.width}×{m.height}</td>
              <td>
                <Button variant="outline-primary" size="sm" onClick={() => handleShow(m)}>Editar</Button>{' '}
                <Button variant="outline-danger" size="sm" onClick={() => confirmDelete(m)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Crear / Editar */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? 'Editar' : 'Nuevo'} Mob</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control name="name" value={form.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Vida</Form.Label>
              <Form.Control type="number" name="health" value={form.health} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ancho</Form.Label>
              <Form.Control type="number" name="width" value={form.width} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Alto</Form.Label>
              <Form.Control type="number" name="height" value={form.height} onChange={handleChange} required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button onClick={handleSubmit}>{editing ? 'Guardar' : 'Crear'}</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Confirmar Eliminación */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar <strong>{mobToDelete?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
