import { ActionTypes } from '../consts';

const initialState = {
    isFetching: false,
    posts: [],
    singlePost: {},
    siteInfo: {
        description: '',
        name: '',
    }
}

export function reducer (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.isFetching:
            return {
                isFetching: true,
                ...state
            }
        case ActionTypes.hasPosts:
            return {
                isFetching: false,
                posts: action.posts,
                ...state
            }
        case ActionTypes.hasSinglePost:
            return {
                isFetching: false,
                singlePost: action.post,
                ...state
            }
        case ActionTypes.hasSiteInfo:
            return {
                isFetching: false,
                siteInfo: {
                    description: action.siteInfo.description,
                    name: action.siteInfo.name
                },
                ...state
            }
        default:
            return state;
    }
}
