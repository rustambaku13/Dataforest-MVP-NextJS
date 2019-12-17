import * as actions from '../constants/action_types';

const INITIAL_STATE = {
  authUser: null
};

function sessionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.SET_AUTH_USER:
      return { authUser: action.payload };
    default: return state;
  }
}

export default sessionReducer;