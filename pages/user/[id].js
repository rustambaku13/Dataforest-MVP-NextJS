import React, { useState } from 'react';
import { useProtectedRoute } from '../../hooks';
import TopHeader from '../../components/TopHeader';
import { getUserInfoByID } from '../../services/user';

function User({ user }) {
  useProtectedRoute(auth => !auth);
  console.log({ user });

  return (
    <>
      <TopHeader title={user.username} />

    </>
  )
}

User.getInitialProps = async ({ store, query }) => {
  const { authUser } = store.getState().sessionState;
  const { id } = query;
  let user = {};

  if (authUser && authUser.id === id) {
    user = authUser;
  }
  else {
    try {
      user = await getUserInfoByID(id);
    }
    catch (e) {
      throw e
    }
  }

  return { user };
}

export default User;