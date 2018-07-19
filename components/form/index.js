import React from 'react'
import styled from 'styled-components'

export default {
  Wrapper: styled.div`
    width: 100%;
    div {
      width: 100%;
    }
    div:not(.react-select) {
      input[type='text'],
      input[type='email'] {
        width: 100%;
      }
    }
  `
}
