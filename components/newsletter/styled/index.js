import styled, { css } from 'styled-components';
import { position, top, left, right, bottom } from 'styled-system';
import { Box } from 'blockstack-ui';
import { above, below, theme, wrapperStyle } from '@common/styles';

const StyledNewsletter = styled(Box)`
  background-color: ${theme.colors.blue};
  overflow: hidden;
  min-height: 75px;
  display: flex;
  position: relative;
  box-shadow: 0 1px 1px 0 rgba(20, 33, 68, 0.04),
    0 1px 3px 1px rgba(20, 33, 68, 0.09);
  border-radius: 6px;
  ${above.md`${wrapperStyle}`};
`;
const Section = styled(Box)`
  flex-grow: 1;
  flex-shrink: 1;
  position: relative;
  z-index: 3;
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `} ${below.md`
    & + & {
      margin-top: 20px;
    }
   `};
`;
const SvgBackgroundElement = styled.div`
  position: absolute;
  ${below.md`
  transform: translateY(12px)`};

  ${position};
  ${top};
  ${right};
  ${bottom};
  ${left};

  @media (max-width: 831px) {
    right: 0 !important;
    left: calc(100% - 60px) !important;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
`;

StyledNewsletter.Svg = SvgBackgroundElement;
StyledNewsletter.Wrapper = Wrapper;
StyledNewsletter.Section = Section;

export { StyledNewsletter };
