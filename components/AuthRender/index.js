import { useSelector } from 'react-redux';

function AuthRender({ renderAuth, renderNonAuth }) {
  const { authUser } = useSelector(state => state.sessionState);

  return authUser ? renderAuth() : renderNonAuth();
}

export default AuthRender;