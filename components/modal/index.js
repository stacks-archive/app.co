import styled, { css } from 'styled-components'

import { theme } from '@common/styles'
import { Box } from 'blockstack-ui'

const CloseButton = styled.div`
  opacity: 0.5;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
  width: 28px;
  height: 28px;
  padding-top: 2px;
  padding-left: 2px;

  ${({ dark }) =>
    dark &&
    css`
      background-color: #000;
      color: white;
      border-radius: 50%;
    `};
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
    background: ${theme.colors.grey.mid};
  }
`

const Content = styled(Box)`
  background-color: white;
  border-radius: 4px;
  position: relative;
  z-index: 10;
  max-width: 40em;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 700px) {
    min-height: 100vh;
  }

  @media (max-width: 40em) {
    border-radius: 0px;
  }

  ${({ dark }) =>
    dark &&
    css`
      background-color: #142144;
      color: white;
      padding-top: 85px;
      background-image: url(/static/images/newsletter-modal-illustration.png);
      background-size: 100%;
      background-repeat: no-repeat;
    `};
`

export default {
  Content,
  Backdrop,
  Modal,
  CloseButton
}
