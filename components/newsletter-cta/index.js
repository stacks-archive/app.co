import Styled from 'styled-components';
import { Button as BTN } from '@components/button';

const Wrapper = Styled.div`
  background-color: #142144;
  width: 100%;
  padding: 35px 50px;
  color: white;
  border-radius: 10px;
  background-image: url(/static/images/subscription-illustration/subscription-illustration@3x.png);
  background-size: cover;

  h2 {
    color: white;
  }
`;

const Section = Styled.div`
  width: 40%;
  display: inline-block;
`;

const RightSection = Section.extend`
  float: right;
  text-align: right;
  margin-top: 20px;
`;

const Input = Styled.input`
  font-size: 14px;
  color: rgba(40, 47, 54, 50%);
  background-color: white;
  border: none;
  width: 225px;
  padding: 10px 15px;
  border-radius: 5px;
  display: inline-block;
  margin-right: 15px;
`;

const Button = BTN.extend`
  display: inline-block;
  background-color: #0ccaba;
  padding-left: 35px;
  padding-right: 35px;
`;

export default {
  Wrapper,
  Section,
  RightSection,
  Input,
  Button,
};
