import {API_URL} from './settings'
import axios from 'axios'
import { Alert } from 'reactstrap'

const fromApiResponseToBooks = apiResponse => {
  
  const {books = []} = apiResponse
  if (Array.isArray(books)) {
    const booksData = books.map(book => {
      console.log(books)
      const { name, auth, description, price, publishedDate, id} = book
      return { name, auth, description, price, publishedDate, id }
    })
    const bookRes = {
      data: booksData,
      totalRows: apiResponse.totalItems
    }
    return bookRes
  }
  return []
}
const fromApiResponseToBook = apiResponse => {
  console.log(apiResponse)
}

export function getBooks ({limit = 4, sortBy = 'id', page = 0, direction = 'asc'} = {}) {
  const apiURL = `${API_URL}/books?pageNo=${page -1 }&pageSize=${limit}&sortBy=${sortBy}&direction=${direction}`
  return fetch(apiURL)
    .then(res => res.json())
    .then(fromApiResponseToBooks)
}

export function deleteBooks ({id}) {
  const apiURL = `${API_URL}/books/${id}`
  return fetch(apiURL,{method:'POST'})
    .then(res => res.json())
}

export async function createBook ({book}) {
  const apiURL = `${API_URL}/books`
  return axios.post(apiURL,book)
    .then(res => res.data)
    .catch(ex =>{
      console.log(ex)
    })
}