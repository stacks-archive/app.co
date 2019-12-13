import Styled from 'styled-components';
import { above, below } from '@common/styles';

export const Ul = Styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const AppLink = Styled.a`
  border-top: 1px solid #e6e9ee;
  padding: 32px;
  color: inherit;
  display: flex !important;
  font-weight: inherit;
  text-decoration: none;
`;

export const Img = Styled.img`
  display: block;
  height: 48px;
  width: 48px;
  box-shadow: rgba(20, 33, 68, 0.04) 0px 1px 5px 0px, rgba(20, 33, 68, 0.09) 0px 1px 6px 1px;
  border-radius: 10px;
`;

export const Container = Styled.div`
  padding-top: 4px;
  padding-left: 32px;
`;

export const Name = Styled.div`
  font-weight: bold;
`;

export const Rank = Styled.span`
  ${below.md`
    display: inline;
  `}
  ${above.md`
    display: none;
  `}
`;

export const Description = Styled.div`
  color: #142144;
  font-size: 0.8em;
  line-height: 1.2em;
  margin-top: 8px;
`;

export const Rewards = Styled.ul`
  margin: 1.5em 0 0 0;
  padding: 0;
  opacity: 0.7;
  list-style: none;
  font-size: 1em;

  li {
    margin: 0.5em 0 0 0;
  }

  strong {
    font-weight: bold;
  }

  ${below.md`
    display: block;
  `}
  ${above.md`
    display: none;
  `}

`;
