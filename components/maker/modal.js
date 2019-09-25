import React from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'

import { CloseIcon } from '@components/svg/maker'

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    paddingTop: '60px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    minHeight: '60vh'
  }
}

const CloseButtonContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px;
`

const CloseButton = ({ handleClick }) => (
  <CloseButtonContainer onClick={handleClick}>
    <CloseIcon/>
  </CloseButtonContainer>
)

const MakerModal = ({ isOpen, handleClose, children }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={handleClose}
    style={customStyles}
    ariaHideApp={false}
  >
    <CloseButton handleClick={handleClose} />
    {children}
  </Modal>
)


export default MakerModal
