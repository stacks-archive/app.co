import React from 'react'
import Modal from 'react-modal'

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    minHeight: '60vh'
  }
}

const EverSignModal = ({ isOpen, handleClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={customStyles}
      ariaHideApp={false}
    >
      {children}
    </Modal>
  )
}

export default EverSignModal
