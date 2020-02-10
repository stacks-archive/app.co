import Styled from 'styled-components';

export const Section = Styled.section`
  background: white;
  margin-top: 32px;
  h2 {
    font-size: 1em;
    cursor: pointer;
    padding: 24px 64px 32px 64px;
  } 
`;

export const Caret = Styled.div`
  border-top: 12px solid rgba(20, 33, 68, 0.7);
  border-bottom: none;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  content: ' ';
  transform: ${({ open }) => (open ? 'none' : 'rotate(-90deg)')};
  transition: transform 0.5s;
  left: -32px;
  position: relative;
  cursor: pointer;
  top: 15px;
  width: 0;
  height: 0;
`;

export const Container = Styled.div`
  padding: 32px;
`;

export const Input = Styled.input`
  background: #f2f4f7;
  box-sizing: border-box;
  border: 1px solid #e6e9ee;
  font-family: inherit;
  font-size: 1em;
  padding: 1em;
  width: 100%;
`;

export const Textarea = Input.withComponent('textarea');

export const Button = Styled.button`
  display: block;
  width: calc(100% - 4em);
  margin: 0 2em 2em 2em;
  background: #729ccc;
  border: none;
  box-sizing: border-box;
  color: white !important;
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  padding: 1em;
  text-align: center;
  text-decoration: none;
`;

export const ButtonLink = Button.withComponent('a');
