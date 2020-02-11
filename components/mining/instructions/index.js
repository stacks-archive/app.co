import Styled from 'styled-components';

export const Ol = Styled.ol`
  // margin: 2em;
  padding: 0;
  counter-reset: counter;
  list-style: none;
  margin: 3em 5em 2em 5em;
`;

export const Li = Styled.li`
  border-bottom: 1px dotted rgba(0, 0, 0, 0.1);
  margin-bottom: 2em;
  padding-bottom: 2em;
  counter-increment: counter;
  padding-top: 0.5em;
  position: relative;

  &::before {
    color: rgba(0, 0, 0, 0.25);
    content: counter(counter) ". ";
    font-size: 2em;
    left: -1.75em;
    position: absolute;
    top: 0;
  }

  p {
    font-size: 16px;
    line-height: 1.5em;
    margin: 0;
    padding-top: 1em;
    a {
      color: #2453d0;
      text-decoration: none;
    }
  }

  p:first-of-type {
    border: none;
    font-weight: bold;
    padding: 0;
  }
`;
