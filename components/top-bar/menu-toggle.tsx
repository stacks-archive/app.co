import React, { useState } from 'react';

import MenuIcon from 'mdi-react/MenuIcon';
import CloseIcon from 'mdi-react/CloseIcon';

export const MenuToggle = ({ on }) =>
  on ? <CloseIcon color="currentColor" /> : <MenuIcon color="currentColor" />;
