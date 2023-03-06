import styled from 'styled-components';

import GlobalErrorModal from './Error';
import GlobalInfoModal from './Info';

const StyledGlobalModalsWrapper = styled.div`
  height: 0;
`;

const SiteGlobalModals = (): JSX.Element => {
  return (
    <StyledGlobalModalsWrapper>
      <GlobalErrorModal />
      <GlobalInfoModal />
    </StyledGlobalModalsWrapper>
  );
};

export default SiteGlobalModals;
