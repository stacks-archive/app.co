import styled, { css } from 'styled-components'
import { wrapperStyles } from '@common/styles'
import { Box, boxProps } from '@components/box'

const StyledPage = styled(Box)`
  ${({ fullHeight }) => fullHeight && `height: 100vh`};
  ${({ background }) => background && `background:${background}`};
`

const Section = styled(Box)`
  display: flex;
  width: 100%;
  ${(props) => wrapperStyles(props)};
  ${boxProps};

  ${({ richText }) =>
    richText &&
    css`
      h1, h2, h3, h4, h5, h6, p {
        max-width: 700px;
      }
    `};
`
const Content = styled.div`
  flex-grow: 1;
`
const Aside = styled.aside`
  max-width: 250px;
  width: 100%;
  flex-shrink: 0;
  padding: 0 10px;
`

StyledPage.Section = Section
StyledPage.Content = Content
StyledPage.Aside = Aside

export { StyledPage }
