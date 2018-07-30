import styled from 'styled-components'

import { theme } from '@common/styles'

const CloseButton = styled.div`
  opacity: 0.5;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`

const Modal = styled.div`
  position: fixed;
  height: 100vh;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  max-height: 100vh;
  @media (max-width: 600px) {
    display: block;
  }
`
const Backdrop = styled.div`
  position: fixed;
  height: 100vh;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  max-height: 100vh;
  z-index: 2;
  &::before {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    opacity: 0.85;
    content: '';
    background: ${theme.colors.blue};
  }
`

const Content = styled.div`
  position: relative;
  width: 100%;
  z-index: 5;
`

export default {
  Content,
  Backdrop,
  Modal,
  CloseButton
}
