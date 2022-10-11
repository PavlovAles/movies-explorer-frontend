import React from 'react';
import AuthorizedNavigation from './AuthorizedNavigation/AuthorizedNavigation';
import UnauthorizedNavigation from './UnauthorizedNavigation/UnauthorizedNavigation';

export default function Navigation({ authorized }) {

  return (
    <>
      {
        authorized ?
          <AuthorizedNavigation /> :
          <UnauthorizedNavigation />
      }
    </>
  )
}
