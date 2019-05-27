import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions/index'

export function handleInitialData () {
    return (dispatch) => {
        return getDecks()
            .then(results => dispatch(receiveDecks(JSON.parse(results))))
    }
}