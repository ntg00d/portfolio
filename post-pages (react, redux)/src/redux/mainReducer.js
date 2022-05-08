import {FETCH_POSTS, FETCH_PAGES} from './actions/actionTypes'

const initialState = {
    posts: [],
    pages: [],
    currentPage: null,
    totalCount: null
}

export const mainReducer = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case FETCH_POSTS:
            return {...state, posts: payload.data, totalCount: payload.count, currentPage: payload.number}

        case FETCH_PAGES:
            const pages = [...state.pages]
            for (let i = 1; i <= state.totalCount / 10; i++) pages.push(i)

            return {...state, pages: pages}

        default:
            return state
    }
}