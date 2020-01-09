import axios from 'axios';
import cookie from 'js-cookie'
import { base_url } from '../constants/api';

export async function getUserInfoByToken(token) {
  try {
    if (token) {
      const { data } = await axios.get(`${base_url}/users/me/`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      return data;
    }

    return null;

  }
  catch (e) {
    throw e;
  }
}

export async function getUserInfoByID(id) {
  try {
    const { data } = await axios.get(`${base_url}/users/${id}/`);
    return data;
  }
  catch (e) {
    throw e;
  }
}

export async function login(credentials) {
  try {
    const { data } = await axios.post(`${base_url}/api-token-auth/`, credentials);
    console.log({ data })
    axios.defaults.headers.common = { 'Authorization': `Token ${data.token}` }
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