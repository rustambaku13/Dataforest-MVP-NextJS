import React, { useState } from 'react';
import useProtectedRoute from '../../hooks/useProtectedRoute';

function Discussion() {
  useProtectedRoute(auth => !auth);

  return (
    <>

    </>
  )
}

Discussion.getInitialProps = async () => {
  
}

export default Discussion;