import styled, { css } from 'styled-components'
import { Box } from '@components/box'
import { space } from 'styled-system'
import { theme, below, above, wrapperStyle } from '@common/styles'

const Item = styled(Box)`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${theme.colors.border};
  flex-grow: 1;
  border-left: 1px solid ${theme.colors.border};
  ${({ link }) =>
    link &&
    css`
      &:hover {
        color: ${theme.colors.grey.dark};
        cursor: pointer;
      }
    `};
    ${({ noBorder }) =>
    noBorder &&
    css`
      border: 0 !important;
    `};
`

const Body = styled(Box)`
  background: white;
  display: flex;
  flex-wrap: wrap;
  border-right: 1px solid ${theme.colors.border};
  flex-grow: 1;
`
const Header = styled(Box)`
  background: linear-gradient(45deg, #9b51e0 0%, #5306b4 200%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledList = styled(Box)`
  box-shadow: 0 1px 1px 0 rgba(20, 33, 68, 0.04), 0 1px 3px 1px rgba(20, 33, 68, 0.09);
  display: flex;
  flex-direction: column;
  ${above.md`
    ${wrapperStyle};
    padding: 0;
    border-radius: 6px;
    overflow: hidden;
  `};
  ${space};
`

Item.defaultProps = {
  p: 3
}

StyledList.Header = Header
StyledList.Body = Body
StyledList.Item = Item

export { StyledList }
