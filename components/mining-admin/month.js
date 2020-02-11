import Styled, { css } from 'styled-components';
import { space, fontSize, width } from 'styled-system';

export const Section = Styled.section`
  ${space}
  ${width}
  width: 100%;
  background: white;
  h1 {
    font-size: 1.2em;
  }
  h1, h2, h3 {
    &:first-child {
      padding: 32px;
      line-height: 1.2em;
    }
  }
`;

export const Content = Styled.div`
  border-top: 1px solid #e6e9ee;
  padding: 2em;
  ${space}
  ${fontSize}
  ${({ errors }) =>
    errors &&
    css`
      background: linear-gradient(white, #fffbea);
    `}
  p {
    line-height: 1.5em;
  }
`;

export const Hr = Styled.hr`
  border: 0;
  border-top: 1px solid #e6e9ee;
  margin: 2em 0;
`;

export default {
  Section,
  Content,
};
