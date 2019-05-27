import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native'
import { 
    submitDeck, 
    getDecks, 
    removeDeck 
} from '../utils/api'
import { connect } from 'react-redux'
import { addDeck } from '../actions/index'

class NewDeck extends Component {

    shouldComponentUpdate = () => true

    state = {
        title: ''
    }

    onSubmit = () => {
        if (this.state.title === '') {
            alert('Enter a title for the new deck') 
        } else {
            const { addDeck } = this.props

            let deck = {
                title: this.state.title,
                questions: []
            }

            submitDeck({ deck, key: this.state.title})

            addDeck(deck)

            this.setState({ title: '' })
            
            Alert.alert(
                'Success',
                'Successfully created deck',
                [
                    { text: 'OK', onPress: () => this.props.navigation.navigate('DeckDetails', { deck }) },
                ],
                { cancelable: false }
            )
        } 
    }

    render () {
        return (
            <View style={styles.containerNewDeck}>
                <Text style={styles.textQuestion}>
                    What is the title of your new deck?
                </Text>
                <TextInput 
                    value={this.state.title}
                    onChangeText={(text) => this.setState({ title: text })}
                    placeholder="Deck Title" 
                    style={styles.inputTitleDeck} />
                <TouchableOpacity onPress={this.onSubmit} style={styles.btnNewDeck}>
                    <Text style={styles.btnTextNewDeck}>Create Deck</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerNewDeck: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textQuestion: {
        margin: 15,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        textAlign: 'center'
    },
    inputTitleDeck: {
        margin: 15,
        padding: 10,
        alignSelf: 'stretch',
        alignItems: 'stretch',
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10
    },
    btnNewDeck: {
        backgroundColor: 'black',
        padding: 10,
        margin: 15,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        alignItems: 'center'
    },
    btnTextNewDeck: {
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        textAlign: 'center'
    }
})

function mapDispatchToProps (dispatch) {
    return {
      addDeck: (deck) => dispatch(addDeck(deck))
    }
}

export default connect(null, mapDispatchToProps)(NewDeck)