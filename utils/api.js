import { AsyncStorage } from 'react-native'

const FLASHCARDS_STORAGE_KEY = 'FlashCards:identify'

export function submitDeck ({ deck, key }) {
    return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
        [key]: deck
    }))
}

export function getDecks () {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
}

export function editDeck ({ deck, key }) {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(results => {
        const data = JSON.parse(results) 
        data[key] = deck
        AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
    })
}

export function removeDeck (key) {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(results => {
        const data = JSON.parse(results) 
        data[key] = undefined
        delete data[key]
        AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
    })
} 