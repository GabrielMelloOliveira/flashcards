import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

class Deck extends Component {
    render () {
        return (
            <View  style={styles.containerCard}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('DeckDetails', { deck: this.props.deck })}>
                    <Text style={styles.titleDeck}>{this.props.deck.title}</Text>
                    <Text style={styles.numberCards}>{this.props.deck.questions.length} cards</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerCard: {
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        borderRadius: 16,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        }
    },
    titleDeck: {
        fontSize: 36,
        textAlign: 'center'
    },
    numberCards: {
        fontSize: 20,
        color: '#95a5a6',
        textAlign: 'center'
    }
})

export default Deck