const initialState = {
    user: {},
    search: ''
}

const UPDATE_USER = 'UPDATE_USER';
const UPDATE_SEARCH = 'UPDATE_SEARCH';


export function updateUser(data) {
    return{
        type: UPDATE_USER,
        payload: data
    }
}

export function updateSearch(search) {
    return{
        type: UPDATE_SEARCH,
        payload: search
    }
}


export default function reducer(state = initialState, action) {
    switch (action.type){
        case UPDATE_USER:
            return Object.assign({}, state, {user: action.payload})
        case UPDATE_SEARCH:
            return Object.assign({}, state, {search: action.payload})
        default:
            return state;
    }
}