import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { selectCurrentApp } from '@stores/apps/selectors'
import { AppCard } from '@components/app-card'
import { theme } from '@common/styles'
import { doClearApp } from '@stores/apps'
import { CloseIcon } from 'mdi-react'
import { Box } from '@components/box'

const mapStateToProps = (state) => ({
  app: selectCurrentApp(state)
})

const CloseButton = styled.div`
  opacity: 0.5;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`

const StyledModal = styled.div`
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

const handleClick = (action) => {
  action()
  if (typeof window !== 'undefined') {
    console.log('goBack one')
    window.history.go(-1)
  }
}

class ModalClass extends React.Component {
  handleClose = (goBack) => {
    const { dispatch } = this.props
    dispatch(doClearApp())
    if (goBack) {
      this.goBack(true)
    }
  }

  goBack = () => {
    if (typeof window !== 'undefined') {
      console.log('document.referrer', document.referrer)
      if (document.referrer.includes('app.co') || document.referrer.includes('localhost')) {
        window.history.go(-1)
      } else {
        window.history.pushState({}, 'App.co - The Universal Dapp Store', `/`)
      }
    }
  }

  handleBack = (event) => {
    if (event.state && !event.state.as.includes('app')) {
      this.handleClose()
    }
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.onpopstate = this.handleBack
    }
  }

  render() {
    const { app } = this.props
    return app ? (
      <StyledModal>
        <Box style={{ position: 'relative', zIndex: 10 }} width={[1, 0.65, 0.65, 0.5]}>
          <CloseButton
            style={{
              position: 'absolute',
              zIndex: 20,
              right: '30px',
              top: '25px'
            }}
            onClick={() => this.handleClose(true)}
          >
            <CloseIcon />
          </CloseButton>
          <AppCard {...app} style={{ position: 'relative', zIndex: 10 }} />
        </Box>
        <Backdrop onClick={() => this.handleClose(true)} />
      </StyledModal>
    ) : null
  }
}

const Modal = connect(mapStateToProps)(ModalClass)

export { Modal }
