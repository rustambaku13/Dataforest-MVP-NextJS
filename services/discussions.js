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

export async function upvoteDiscussion({ id }) {
  try {
    const { data } = await axios.post(`${base_url}/discussions/${id}/upvote/`);
    return data;
  }
  catch (e) {
    throw e;
  }
}

export async function getDiscussionComments({ id }) {
  try {
    const { data } = await axios.get(`${base_url}/discussions/${id}/comments/`);
    return data;
  }
  catch (e) {
    throw e;
  }
}

export async function createDiscussionComment({ id, comment }) {
  try {
    const { data } = await axios.post(`${base_url}/discussions/${id}/comments/`, {
      comment
    });
    return data;
  }
  catch (e) {
    throw e;
  }
}

export async function upvoteComment({ discussionID, commentID }) {
  try {
    const { data } = await axios.post(`${base_url}/discussions/${discussionID}/comments/${commentID}/upvote/`);
    return data;
  }
  catch (e) {
    throw e;
  }
}

export async function replyComment({ discussionID, commentID, comment }) {
  try {
    const { data } = await axios.post(`${base_url}/discussions/${discussionID}/comments/${commentID}/reply/`, {
      comment
    });
    return data;
  }
  catch (e) {
    throw e;
  }
}