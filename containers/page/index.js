import React from 'react';
import { StyledPage } from '@components/page/styled';

const Page = ({ children, ...rest }) => (
  <StyledPage {...rest}>{children}</StyledPage>
);

Page.Sidebar = StyledPage.Aside;
Page.Section = StyledPage.Section;
Page.Section.Content = StyledPage.Content;
export { Page };
