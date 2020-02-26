import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Headroom from 'react-headroom';

import { HelloBar } from '@components/hellobar';
import { StyledTopBar } from '@components/top-bar/styled';
import { SearchBar } from '@components/search';
import GetUpdatesModal from '@containers/modals/get-updates';
import { Box } from 'blockstack-ui';
import { Navigation } from '@components/navigation';
import { ActiveLinkList } from '@components/navigation/helpers';
import { primaryNavLinks, adminLinks } from '@common/constants';
import { HomeLink } from './home-link';
import { MenuToggle } from './menu-toggle';

const handleBodyScroll = (on: boolean) => {
  const { body } = document;
  const noScrollClassName = 'no-scroll';
  on
    ? body.classList.remove(noScrollClassName)
    : body.classList.add(noScrollClassName);
};

export const TopBar = ({ isErrorPage, admin, wrap, ...props }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const NavLinks = () => (
    <>
      {admin && (
        <ActiveLinkList
          list={adminLinks}
          activeRoute={router.route}
          isErrorPage={isErrorPage}
        />
      )}
      <ActiveLinkList
        list={primaryNavLinks}
        activeRoute={router.route}
        isErrorPage={isErrorPage}
      />
    </>
  );

  return (
    <Headroom>
      <HelloBar />
      <StyledTopBar {...props}>
        <StyledTopBar.Wrapper wrap={wrap}>
          <StyledTopBar.Section grow>
            <HomeLink isErrorPage={isErrorPage} />
            <SearchBar transparent />
          </StyledTopBar.Section>
          <StyledTopBar.Section>
            <Navigation
              variant="main"
              display={['none', 'flex']}
              isErrorPage={isErrorPage}
              admin={admin}
            >
              <NavLinks />
            </Navigation>
            <Box display={['block', 'none']}>
              <Box
                cursor="pointer"
                onClick={() => {
                  setMenuOpen(!menuOpen);
                  handleBodyScroll(menuOpen);
                }}
              >
                <MenuToggle on={menuOpen} />
              </Box>
              <Navigation
                mobile
                admin={admin}
                isErrorPage={isErrorPage}
                display={[menuOpen ? 'flex' : 'none', 'none']}
              >
                <NavLinks />
              </Navigation>
            </Box>
          </StyledTopBar.Section>
        </StyledTopBar.Wrapper>
      </StyledTopBar>
      <GetUpdatesModal />
    </Headroom>
  );
};
