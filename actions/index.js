export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const EDIT_DECK = 'EDIT_DECK'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export function receiveDecks (decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function updateDeck (deck) {
    return {
        type: EDIT_DECK,
        deck
    }
}

export function addDeck (deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

export function addCard (card) {
    return {
        type: ADD_CARD,
        card
    }
}