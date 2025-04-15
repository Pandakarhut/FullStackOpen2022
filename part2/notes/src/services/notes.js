import axios from 'axios'
// const baseUrl = 'http://localhost:3001/notes'

// relative path
const baseUrl = '/api/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
// // hard coded deleted notes below
//   const nonExisting1 = {
// 	id: 10000,
// 	content: '1st note does not exist',
// 	important: true,
//   }
//   const nonExisting2 = {
// 	id: 10001,
// 	content: '2nd note does not exist',
// 	important: true,
//   }
//   return request.then(response => response.data.concat(nonExisting1, nonExisting2))
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => (response.data))
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update }