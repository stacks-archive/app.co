import Styled from 'styled-components'

export const Ul = Styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

export const AppLink = Styled.a`
  border-top: 1px solid #e6e9ee;
  padding: 32px;
  color: inherit;
  display: flex;
  font-weight: inherit;
  text-decoration: none;
`

export const Img = Styled.img`
  display: block;
  height: 48px;
  width: 48px;
  box-shadow: rgba(20, 33, 68, 0.04) 0px 1px 5px 0px, rgba(20, 33, 68, 0.09) 0px 1px 6px 1px;
  border-radius: 10px;
`

export const Container = Styled.div`
  padding-top: 4px;
  padding-left: 32px;
`

export const Name = Styled.div`
  font-weight: bold;
`

export const Description = Styled.div`
  color: #142144;
  font-size: 0.8em;
  line-height: 1.2em;
  margin-top: 8px;
`
