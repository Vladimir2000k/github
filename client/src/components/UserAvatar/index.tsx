import React, {useMemo} from 'react';

import styled from 'styled-components';

const Container = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;

  border-radius: 50%;

  background-color: #d7edff;

  .abbreviation {
    font-family: Inter, sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    text-align: center;
    letter-spacing: -0.014em;
    color: #0452c8;
  }
`;

interface UserAvatarProps {
  className?: string;
  firstName?: string;
  lastName?: string;
  onClick?: () => void;
}

const UserAvatar = ({className, firstName = 'N', lastName = 'S'}: UserAvatarProps): JSX.Element => {
  const {name, surname} = useMemo(() => {
    return {
      name: firstName !== '' ? firstName[0].toUpperCase() : 'N',
      surname: lastName !== '' ? lastName[0].toUpperCase() : 'S',
    };
  }, [firstName, lastName]);

  return (
    <Container className={className}>
      <div className="abbreviation">
        {name}
        {surname}
      </div>
    </Container>
  );
};

export default UserAvatar;
