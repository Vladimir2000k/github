import React from 'react';

import styled from 'styled-components';

import TextBlock, {TEXT_BLOCK_TYPE} from '../TextBlock';

const StyledErrorMessage = styled.div`
  & .error-text-block {
    white-space: pre-line;
  }
`;

const ErrorMessage = ({errors, className}: {errors: string[]; className?: string}): JSX.Element => {
  return (
    <StyledErrorMessage className={className}>
      {errors?.length > 0 && (
        <TextBlock className="error-text-block" type={TEXT_BLOCK_TYPE.ERROR}>
          {errors.join('\n')}
        </TextBlock>
      )}
    </StyledErrorMessage>
  );
};

export default ErrorMessage;
