import axios from 'axios';
import { base_url } from '../constants/api';

export function getDiscussions({ category }) {
  try {
    const { data } = axios.get(`${base_url}/discussions/?category=${category}`);
    return data;
  }
  catch (e) {
    throw e;
  }
}