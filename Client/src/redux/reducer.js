import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    ADD_FAV,
    REMOVE_FAV,
    FILTER_CARDS,
    ORDER_CARDS
} from './actions/actions-types'

const initialState = {
    myFavorites: [],
    allCharacters: [],
    user: null,
    token: null,
    access: false,
    isLoading: false,
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                access: action.payload.access,
                user: action.payload.user,
                token: action.payload.token,
                error: null
            }
        
        case LOGIN_FAILURE:
            return {
                ...state,
                access: false,
                user: null,
                token: null,
                error: action.payload
            }
        
        case LOGOUT:
            return {
                ...state,
                access: false,
                user: null,
                token: null,
                myFavorites: [],
                allCharacters: [],
                error: null
            }
        
        case ADD_FAV:
            return {
                ...state,
                myFavorites: action.payload,
                allCharacters: action.payload
            }
        
        case REMOVE_FAV:
            return {
                ...state,
                myFavorites: action.payload
            }

        case FILTER_CARDS:
            const filtered = state.allCharacters.filter(
                character => character.gender === action.payload
            )
            return {
                ...state,
                myFavorites: filtered
            }

        case ORDER_CARDS:
            const orderedChars = state.allCharacters
                .sort((a, b) => {
                    if (action.payload === "Ascendent") return a.id - b.id
                    if (action.payload === "Descendent") return b.id - a.id
                    return 0
                })
            return {
                ...state,
                myFavorites: orderedChars
            }
        
        default:
            return state
    }
}

export default reducer