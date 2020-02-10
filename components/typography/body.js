import styled from 'styled-components';
import { baseProps } from '@components/typography/headings';

const P = styled.p`
  ${baseProps};
`;

const Span = styled.span`
  ${baseProps};
`;

const Body = styled.div`
  ${baseProps};
`;

const Strong = styled.strong`
  font-weight: 500;
  ${baseProps};
`;

const Em = styled.em`
  ${baseProps};
`;
const Ul = styled.ul`
  ${baseProps};
`;
const Ol = styled.ol`
  ${baseProps};
`;

const Li = styled.li`
  ${baseProps};
`;

const Pre = styled.pre`
  ${baseProps};
`;

Body.p = P;
Body.span = Span;
Body.strong = Strong;
Body.em = Em;
Body.ul = Ul;
Body.ol = Ol;
Body.li = Li;
Body.oli = Li;
Body.pre = Pre;

export default Body;
