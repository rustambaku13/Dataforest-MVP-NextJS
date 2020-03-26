import axios from 'axios';
import { base_url } from '../constants/api';
import moment from 'moment';

export async function getAllTasks(limit = 20, offset = 20) {
  try {
    const { data } = await axios.get(`${base_url}/tasks/?limit=${limit}&offset=${offset}`);
    return data;
  }
  catch (e) {
    throw e;
  }
}

export async function getMyTasks() {
  try {
    const { data } = await axios.get(`${base_url}/tasks/`);
    return data;
  }
  catch (e) {
    throw e;
  }
}

export async function getTags() {
  try {
    const { data } = await axios.get(`${base_url}/tags/`);
    return data;
  }
  catch (e) {
    throw e;
  }
}

export async function getTaskByID(id) {
  try {
    const { data } = await axios.get(`${base_url}/tasks/${id}/`);
    return data;
  }
  catch (e) {
    throw e;
  }
}

export async function createTask(task) {
  // const { title, description, price, quantity, task_type, deadline, extension, height, width, image_type, labels } = task;
  try {
    const { data } = await axios.post(`${base_url}/tasks/`, task);
    return data;
  }
  catch (e) {
    throw e;
  }

}