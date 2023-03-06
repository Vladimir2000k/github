import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

import {theme} from '../../../theme';

const CustomLink = styled(NavLink)`
  height: fit-content;

  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  color: ${theme.colors.primary};
  cursor: pointer;
  user-select: none;
  text-decoration: none;

  &:hover {
    color: ${theme.colors.accent};
  }
`;

export default CustomLink;
