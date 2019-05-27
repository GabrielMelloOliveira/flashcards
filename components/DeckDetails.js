import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

class DeckDetails extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('deck').title
        }
    }

    shouldComponentUpdate = () => true

    onAddCard = () => {
        this.props.navigation.navigate('AddCard', { deck: this.props.deck })
    }

    onStartQuiz = () => {
        this.props.navigation.navigate('Quiz', { deck: this.props.deck })
    }

    render () {
        const { deck } = this.props

        return (
            <View style={styles.containerDeckDetails}>
                <Text style={styles.titleDeck}>{deck.title}</Text>
                <Text style={styles.numberCards}>{deck.questions.length} cards</Text>
                <TouchableOpacity onPress={this.onAddCard} style={[styles.btnDeckDetails, { backgroundColor: 'white', marginTop: 35 }]}>
                    <Text style={[styles.btnTextDeckDetails, { color: 'black' }]}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onStartQuiz} style={[styles.btnDeckDetails, { backgroundColor: 'black' }]}>
                    <Text style={[styles.btnTextDeckDetails, { color: 'white' }]}>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        ) 
    }
}

const styles = StyleSheet.create({
    containerDeckDetails: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleDeck: {
        fontSize: 36,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    numberCards: {
        fontSize: 20,
        color: '#95a5a6',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnDeckDetails: {
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    btnTextDeckDetails: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        textAlign: 'center'
    }
})

function mapStateToProps (state, props) {
    const deck = props.navigation.getParam('deck')
    
    return {
        deck: state[deck.title]
    }
}

export default connect(mapStateToProps)(DeckDetails)