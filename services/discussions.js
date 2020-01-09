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

export async function getDiscussionByID(id) {
  try {
    const { data } = await axios.get(`${base_url}/discussions/${id}/`);
    return data;
  }
  catch (e) {
    throw e;
  }
}

export async function createDiscussion({ title, category, core }) {
  try {
    const { data } = await axios.post(`${base_url}/discussions/`, {
      title,
      category,
      core
    });
    return data;
  }
  catch (e) {
    throw e;
  }
}