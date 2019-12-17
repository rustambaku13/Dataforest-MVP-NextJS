import * as actions from '../constants/action_types';

export function setAuthUser(payload) {
  return {
    type: actions.SET_AUTH_USER,
    payload
  }
}