import * as React from 'react';
import { HeaderDesktop } from './header-desktop';
import { HeaderMobile } from './header-mobile';

function Header () {
  return (
    <>
      <HeaderDesktop/>
      <HeaderMobile/>
    </>
  );
}

export { Header };

