import styled from 'styled-components';
import { Box } from 'blockstack-ui';

const StyledHeroSlider = styled(Box)`
  width: 100%;
  padding: 20px 0;
`;
const Item = styled.div`
  min-height: 400px;
  background: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px;
`;
StyledHeroSlider.Item = Item;
export { StyledHeroSlider };
