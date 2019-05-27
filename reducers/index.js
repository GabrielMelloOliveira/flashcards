import { 
    RECEIVE_DECKS,
    EDIT_DECK,
    ADD_DECK
} from '../actions'

export default function decks (state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return {
                ...state,
                [action.deck.title]: action.deck
            }  
        case EDIT_DECK:
            return {
                ...state,
                [action.deck.title]: action.deck
            }
        default:
            return state
    }
}