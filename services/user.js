import axios from 'axios';
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import { base_url } from '../constants/api';

export async function autoLogin(ctx) {
  try {
    const { token } = nextCookie(ctx);

    if (token) {
      const { data } = await axios.get(`${base_url}/users/`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      return data;
    }

    return {};
    
  }
  catch (e) {
    throw e;
  }
}

export async function login(credentials) {
  try {
    const { data } = await axios.post(`${base_url}/api-token-auth/`, credentials);
    cookie.set('token', data.token);
    return data.token;
  }
  catch (e) {
    throw e;
  }
}

export async function signup(credentials) {
  try {
    const { data } = await axios.post(`${base_url}/users/`, credentials);
    return data;
  }
  catch (e) {
    throw e;
  }
}