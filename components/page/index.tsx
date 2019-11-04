import React from 'react'
import { TopBar } from '@components/top-bar'
import { Footer } from '@components/footer'

import { StyledPage } from './styled'

interface PageProps {
  isErrorPage?: boolean;
  children?: React.ReactNode;
  admin?: boolean;
  wrap?: boolean;
  innerPadding?: number | number[];
  subNav?: React.ReactNode;
}

const Page = ({ isErrorPage = false, children, admin = false, wrap, innerPadding = [2, 0], subNav, ...rest }: PageProps) => (
  <StyledPage {...rest}>
    <TopBar isErrorPage={isErrorPage} admin={admin} wrap={wrap} />
    {React.isValidElement(subNav) && subNav}
    <StyledPage.Section flexDirection={['column']} alignItems="center" pt={[3, 4]} px={innerPadding}>
      {children}
    </StyledPage.Section>
    <StyledPage.Section flexDirection={['column']} alignItems="center" px={[2, 0]}>
      <Footer pb={3} isErrorPage={isErrorPage} admin={admin}/>
    </StyledPage.Section>
  </StyledPage>
)

const pxProps = ({ px }) => (px ? { px: [2, 4] } : {})
const pyProps = ({ py }) => (py ? { py: [1, 4] } : {})

const Section = (props: any) => <StyledPage.Section {...props} {...pxProps(props)} {...pyProps(props)} />

Page.Sidebar = StyledPage.Aside
Page.Section = Section
Page.Content = StyledPage.Content

export { Page }
