const initialState = {
    user: {},
    businessAccount: {},
    currentBusiness: {}
}

const UPDATE_USER = 'UPDATE_USER';
const UPDATE_BUSINESS_ACCOUNT = 'UPDATE_BUSINESS_ACCOUNT';
const UPDATE_CURRENT_BUSINESS = 'UPDATE_CURRENT_BUSINESS';


export function updateUser(data) {
    return{
        type: UPDATE_USER,
        payload: data
    }
}

export function updateBusinessAccount(data) {
    return{
        type: UPDATE_BUSINESS_ACCOUNT,
        payload: data
    }
}

export function updateCurrentBusiness(data) {
    return{
        type: UPDATE_CURRENT_BUSINESS,
        payload: data
    }
}




export default function reducer(state = initialState, action) {
    switch (action.type){
        case UPDATE_USER:
            return Object.assign({}, state, {user: action.payload})

        case UPDATE_BUSINESS_ACCOUNT:
            return Object.assign({}, state, {businessAccount: action.payload})
        
            case UPDATE_CURRENT_BUSINESS:
            return Object.assign({}, state, {currentBusiness: action.payload})

        default:
            return state;
    }
}