import axios from 'axios';
import { base_url } from '../constants/api';

export async function getDiscussions({ category }) {
  try {
    const { data } = await axios.get(`${base_url}/discussions/?category=${category}`);
    return data;
  }
  catch (e) {
    throw e;
  }
}