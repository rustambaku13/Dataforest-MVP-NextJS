import axios from 'axios';
import { base_url } from '../constants/api';

export function getTasks({ taskType }) {
  try {
    const { data } = axios.get(`${base_url}/tasks/?task_type=${taskType}`);
    return data;
  }
  catch (e) {
    throw e;
  }
}