import React from 'react'
import { CloseIcon } from 'mdi-react'
import { connect } from 'react-redux'

import { selectCurrentApp } from '@stores/apps/selectors'
import { doClearApp } from '@stores/apps'

import StyledModal from '@components/modal'
import { Box } from '@components/box'
import { AppCard } from '@components/app-card'


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
      <StyledModal.Modal>
        <Box style={{ position: 'relative', zIndex: 10, maxWidth: 558 }} width={[1, 0.65, 0.65, 0.5]}>
          <StyledModal.CloseButton
            style={{
              position: 'absolute',
              zIndex: 20,
              right: '30px',
              top: '25px'
            }}
            onClick={() => this.handleClose(true)}
          >
            <CloseIcon />
          </StyledModal.CloseButton>
          <AppCard {...app} style={{ position: 'relative', zIndex: 10 }} />
        </Box>
        <StyledModal.Backdrop onClick={() => this.handleClose(true)} />
      </StyledModal.Modal>
    ) : null
  }
}

const mapStateToProps = (state) => ({
  app: selectCurrentApp(state)
})

const Modal = connect(mapStateToProps)(ModalClass)

export default Modal
