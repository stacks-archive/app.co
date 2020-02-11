import styled from 'styled-components';

const Card = styled.div`
  border-radius: 11px;
  padding: 25px;
  position: relative;
  height: 330px;
  overflow: hidden;

  p {
    font-size: 0.8rem;
    line-height: 1.1rem;
  }
`;

const GrayCard = styled(Card)`
  background-color: #b7bbc4;
  background-image: url('/static/images/submit-dapp-card-illustration/illustration@3x.png');
  background-position: right bottom;
  background-repeat: no-repeat;
  background-size: cover;
  h3 {
    color: #142144;
  }
`;

const SubmitDappIllustration = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  max-width: 100%;
  z-index: 0;
`;

export default {
  Card,
  GrayCard,
  SubmitDappIllustration,
};
