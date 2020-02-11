import styled, { css } from 'styled-components';
// import Shevy from 'shevyjs'
import {
  color,
  fontSize,
  fontWeight,
  fontFamily,
  textStyle,
  textAlign,
  lineHeight,
  opacity,
  borders,
  borderRadius,
  width,
  maxWidth,
  display,
} from 'styled-system';
import { boxProps } from '@components/box';

// const shevy = new Shevy()
// const { baseSpacing: bs, h1, h2, h3, h4, h5, h6 } = shevy

export const baseProps = css`
  color: rgba(20, 33, 68, 1);
  ${color};
  ${boxProps};
  ${fontSize};
  ${fontWeight};
  ${fontFamily};
  ${textStyle};
  ${lineHeight};
  ${opacity};
  ${textAlign};
  ${maxWidth};
  ${width};
  ${borders};
  ${display};
  ${borderRadius};
  ${maxWidth};
`;
const H1 = styled.h1`
  ${baseProps};
`;
const H2 = styled.h2`
  ${baseProps};
`;
const H3 = styled.h3`
  ${baseProps};
`;
const H4 = styled.h4`
  ${baseProps};
`;
const H5 = styled.h5`
  ${baseProps};
`;
const H6 = styled.h6`
  ${baseProps};
`;

export { H1, H2, H3, H4, H5, H6 };
