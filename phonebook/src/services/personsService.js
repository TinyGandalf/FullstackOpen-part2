import axios from 'axios'
const url = 'http://localhost:3001/persons'

const getAll = () => 
  axios
    .get(url)
    .then(response => response.data)

const add = person =>
  axios
    .post(url, person)
    .then(response => response.data)

const remove = person =>
  axios
    .delete(`${url}/${person.id}`)
    .then(response => response.data)

const update = person =>
  axios
    .put(`${url}/${person.id}`, person)
    .then(response => response.data)

export default { getAll, add, remove, update }