import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export const Aviso = () => {
  const [showCustomModal, setShowCustomModal] = useState(true);

  const handleCloseCustomModal = () => {
    setShowCustomModal(false);
  };

  return (
    <div>
      {/* Modal de aviso personalizado */}
      <Modal show={showCustomModal} onHide={handleCloseCustomModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Querido potterhead</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Por el momento no tenemos pagos en línea, pero puedes pagar en tienda.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleCloseCustomModal}>
            Cerrar
          </Button>
          <Button variant="info" onClick={() => setShowCustomModal(false)}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Aviso;
