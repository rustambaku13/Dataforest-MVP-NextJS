import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

/**
 * Protected route hook
 * @param {Function} condition(authUser): callback function to decide if it should be protected
 */
function useProtectedRoute(condition) {
  const { authUser } = useSelector(state => state.sessionState);
  const Router = useRouter();

  useEffect(() => {
    if (condition(authUser)) {
      Router.push('/');
    }
  }, []);
}

export default useProtectedRoute;