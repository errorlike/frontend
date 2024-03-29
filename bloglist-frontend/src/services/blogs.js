import axios from 'axios';
const baseUrl = '/api/blogs';
let token;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, { headers: { Authorization: token } });
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};
const deleteBlog = async (id) => {
  await axios.delete(`${baseUrl}/${id}`);
};
const blogsService = {
  getAll,
  create,
  update,
  deleteBlog,
  setToken
};
export default blogsService;