import axios from "axios";
const baseUrl = "http://localhost:3003/persons";

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => {
    return response.data
  })
};

const create = (newObject) => {
  const request  = axios.post(baseUrl, newObject);
  return request.then(response=>{
    return response.data;
  })
}

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response)=> {
    return response.data;
  })
}

const changeNumber = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => {
    return response.data;
  })
}

export default { getAll, create, deletePerson, changeNumber }