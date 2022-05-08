import {FETCH_POSTS, FETCH_PAGES} from './actionTypes'

export const fetchPosts = (number) => async dispatch => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${number}`)
    const data = await response.json()
    const count = Number(response.headers.get('x-total-count'))

    dispatch({type: FETCH_POSTS, payload: {data, count, number}})
}

export const fetchPages = () => ({type: FETCH_PAGES})