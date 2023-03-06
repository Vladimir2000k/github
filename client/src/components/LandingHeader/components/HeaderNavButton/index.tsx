import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

import {theme} from '../../../../theme';

const HeaderNavButton = styled(NavLink)`
  height: fit-content;

  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: ${theme.colors.primary};
  cursor: pointer;
  user-select: none;
  text-decoration: none;

  padding: 30px 0 0;
  margin-right: 26px;

  &.${(props) => props.activeClassName} {
    border-bottom: 1px solid ${theme.colors.primary};
  }

  &:hover {
    color: ${theme.colors.accent};
  }

  &.${(props) => props.activeClassName}:hover {
    color: ${theme.colors.accent};
    border-bottom: 1px solid ${theme.colors.accent};
  }
`;

export default HeaderNavButton;
