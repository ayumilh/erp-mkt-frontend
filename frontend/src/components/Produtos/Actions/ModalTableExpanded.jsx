import React from 'react';
import Modal from '@mui/material/Modal';

const ModalTableExpanded = ({ isOpen, handleClose }) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 id="modal-title">Produtos</h2>
        <p id="modal-description">Tabelinha</p>
        <button onClick={handleClose}>Fechar</button>
      </div>
    </Modal>
  );
};

export default ModalTableExpanded;