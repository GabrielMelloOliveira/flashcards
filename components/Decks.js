import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList
} from 'react-native'
import Deck from './Deck'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { handleInitialData } from '../actions/shared'
import { receiveDecks } from '../actions/index'

class Decks extends Component {

    static navigationOptions = {
        header: null,
        tabBarVisible: false
    }

    shouldComponentUpdate = () => true

    state = {
        decks: [],
        refreshing: false
    }

    componentDidMount() {
        getDecks().then(results => { 
            this.props.dispatch(receiveDecks(JSON.parse(results)))
            this.setState({ decks: JSON.parse(results) })
        })
    }

    renderItem = ({ item }) => <Deck navigation={this.props.navigation} deck={item}/>

    onRefresh = () => {
        this.setState({ refreshing: true })
        getDecks().then(results => { 
            this.props.dispatch(receiveDecks(JSON.parse(results)))
            this.setState({ decks: JSON.parse(results), refreshing: false })
        })
    }

    orderBy = (list) => {
        return list.sort((a, b) => {
            if (a.questions.length > b.questions.length) return -1
            if (a.questions.length < b.questions.length) return 1
            return 0
        }) 
    }

    render () {
        const decks = Object.values(this.props.decks) || []

        let newDecks = this.orderBy(decks)

        return (
            <View style={{ flex: 1, paddingTop: 20 }}>
                {newDecks !== [] 
                    ? <FlatList
                        data={newDecks} 
                        keyExtractor={item => `${item.title}`}
                        renderItem={this.renderItem} 
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh} /> 
                    : <Text style={{ justifyContent: 'center', alignItems: 'center', fontSize: 36 }}>No Decks</Text>
                }
            </View>
        )
    }
}

function mapStateToProps (state) {
    return {
        decks: state
    }
}

export default connect(mapStateToProps)(Decks)