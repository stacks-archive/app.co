import styled from 'styled-components';
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

  @media (max-width: 768px) {
    padding: 55px 50px;
  }
`;

const Section = Styled.div`
  width: 40%;
  display: inline-block;

  @media (max-width: 768px) {
    width: 100%;
    display: block;
    text-align: center;
  }
`;

const RightSection = styled(Section)`
  float: right;
  text-align: right;
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 40px;
    text-align: center;
    width: 100%;
    display: block;
  }
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

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Button = styled(BTN)`
  display: inline-block;
  background-color: #0ccaba;
  padding-left: 35px;
  padding-right: 35px;

  @media (max-width: 1069px) {
    margin-top: 20px;
    margin-right: 15px;
  }

  @media (max-width: 768px) {
    margin-top: 40px;
    margin-right: 0px;
  }
`;

export default {
  Wrapper,
  Section,
  RightSection,
  Input,
  Button,
};
