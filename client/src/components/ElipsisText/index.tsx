import React from 'react';

import Clamp from 'react-multiline-clamp';

const EllipsisText = ({
  children,
  lines = 2,
  className,
}: {
  children?: React.ReactNode;
  lines?: number;
  className?: string;
}): JSX.Element => {
  return (
    <Clamp lines={lines} className={className}>
      {children}
    </Clamp>
  );
};

export default EllipsisText;
