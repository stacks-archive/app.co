import styled, { css, StyledComponent } from 'styled-components';
import { wrapperStyles } from '@common/styles';
import { Box, boxProps } from '@components/box';

const Section = styled(Box)`
  display: flex;
  width: 100%;
  ${wrapperStyles()};
  ${boxProps};

  ${({ richText }) =>
    richText &&
    css`
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p {
        max-width: 700px;
      }
    `};
`;
const Content = styled.div`
  flex-grow: 1;
`;
const Aside = styled.aside`
  max-width: 250px;
  width: 100%;
  flex-shrink: 0;
  padding: 0 10px;
`;

interface Page {
  Section?: typeof Section;
  Content?: typeof Content;
  Aside?: typeof Aside;
}

const StyledPage: Page &
  StyledComponent<any, any, object, string | number | symbol> = styled(Box)`
  ${({ background }) => background && `background:${background}`};
`;

StyledPage.Section = Section;
StyledPage.Content = Content;
StyledPage.Aside = Aside;

export { StyledPage };
