import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { editDeck } from '../utils/api'
import { updateDeck } from '../actions/index'

class AddCard extends Component {

    static navigationOptions = {
        title: 'Add Card'
    }

    shouldComponentUpdate = () => true

    state = {
        question: '',
        answer: ''
    }

    onSubmit = () => {
        if (this.state.question === '') {
            alert('Enter a question for the new card')
        } else if (this.state.answer === '') {
            alert('Enter a answer for the new card')
        } else {
            const { deck, addCard } = this.props

            let newQuestions = deck.questions
            newQuestions.push({ 
                question: this.state.question,
                answer: this.state.answer
            })

            let newDeck = {
                title: deck.title,
                questions: newQuestions
            }

            editDeck({ deck: newDeck, key: deck.title })

            addCard(newDeck)

            this.setState({ question: '', answer: '' })

            alert('Card added')
        }
    }

    shouldComponentUpdate (nextProps) {
        return true
    } 

    render () { 
        return (
            <View style={styles.containerAddCard}>
                <TextInput 
                    value={this.state.question}
                    onChangeText={(text) => this.setState({ question: text })}
                    placeholder="Card Question" 
                    style={styles.inputAddCard} />
                <TextInput 
                    value={this.state.answer}
                    onChangeText={(text) => this.setState({ answer: text })}
                    placeholder="Card Answer" 
                    style={styles.inputAddCard} />
                <TouchableOpacity onPress={this.onSubmit} style={styles.btnAddCard}>
                    <Text style={styles.btnTextAddCard}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerAddCard: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputAddCard: {
        margin: 15,
        padding: 10,
        alignSelf: 'stretch',
        alignItems: 'stretch',
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10
    },
    btnAddCard: {
        backgroundColor: 'black',
        padding: 10,
        margin: 15,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        alignItems: 'center'
    },
    btnTextAddCard: {
        color: 'white',
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

function mapDispatchToProps (dispatch) {
    return {
      addCard: (deck) => dispatch(updateDeck(deck))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)