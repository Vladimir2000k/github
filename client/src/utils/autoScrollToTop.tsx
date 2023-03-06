import React, {useEffect} from 'react';

import {withRouter} from 'react-router-dom';

const ScrollToTop = ({
  children,
  location: {pathname},
}: {
  children: React.ReactNode;
  location: Location;
}) => {
  useEffect(() => {
    document.getElementById('root').scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return children || null;
};

// @ts-ignore
export default withRouter(ScrollToTop);
