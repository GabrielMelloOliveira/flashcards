import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native'
import { connect } from 'react-redux'
import { 
    clearLocalNotification, 
    setLocalNotification 
} from '../utils/notifications'

class Quiz extends Component {

    static navigationOptions = {
        title: 'Quiz'
    }

    state = {
        showAnswer: false,
        currentQuestion: 0,
        totalCorrect: 0
    }

    onResponseQuestion (response) { 
        const { deck } = this.props
        if ((this.state.currentQuestion + 1) < (deck.questions.length)) {
            if (response) {
                this.setState({ totalCorrect: this.state.totalCorrect + 1, currentQuestion: this.state.currentQuestion + 1, showAnswer: false })
            } else {
                this.setState({ currentQuestion: this.state.currentQuestion + 1, showAnswer: false })
            }
        } else {
            let total = response ? this.state.totalCorrect + 1 : this.state.totalCorrect
            
            clearLocalNotification()
                .then(setLocalNotification)

            Alert.alert(
                'Quiz Finished',
                `${total} questions (${((total/deck.questions.length)*100).toFixed(2)}%) were correctly answered from ${deck.questions.length} questions`,
                [
                    { text: 'Back to Deck', onPress: () => this.props.navigation.goBack() },
                    { text: 'Restart Quiz', onPress: () => this.restartQuestion() },
                ],
                { cancelable: false }
            )
        }
    }

    restartQuestion () {
        this.setState({
            showAnswer: false,
            currentQuestion: 0,
            totalCorrect: 0
        })
    }

    render () {
        const { deck } = this.props

        let card = { question: '', answer: '' }
 
        if (deck.questions !== null && deck.questions.length > 0) { 
            card = deck.questions[this.state.currentQuestion] 
        } else {
            return (
                <View style={styles.containerNoCards}>
                    <Text style={styles.noCards}>The deck does not have any cards</Text>
                </View>
            )
        }

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.containerCurrentQuestion}>
                    <Text style={styles.textCurrentQuestion}>{this.state.currentQuestion + 1}/{deck.questions.length}</Text>
                </View>
                <View style={styles.containerDeckDetails}>
                    <Text style={styles.titleDeck}>{this.state.showAnswer ? card.answer : card.question}</Text>
                    <TouchableOpacity onPress={() => this.setState({ showAnswer: !this.state.showAnswer })}>
                        <Text style={styles.showQuestionAnswer}>{this.state.showAnswer ? 'Show question' : 'Show answer'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onResponseQuestion(true)} style={[styles.btnDeckDetails, { backgroundColor: 'green', marginTop: 35 }]}>
                        <Text style={styles.btnTextDeckDetails}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onResponseQuestion(false)} style={[styles.btnDeckDetails, { backgroundColor: 'red' }]}>
                        <Text style={styles.btnTextDeckDetails}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
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
        alignItems: 'center',
        margin: 20
    },
    showQuestionAnswer: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnDeckDetails: {
        padding: 10,
        margin: 10,
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'white',
        justifyContent: 'flex-end',
        alignSelf: 'stretch',
        alignItems: 'stretch'
    },
    btnTextDeckDetails: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
    },
    containerCurrentQuestion: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    textCurrentQuestion: {
        fontSize: 24,
        justifyContent: 'flex-start', 
        alignSelf: 'flex-start',
        textAlign: 'left',
        margin: 10,
        marginLeft: 20,
        marginRight: 20
    },
    containerNoCards: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noCards: {
        fontSize: 36,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    }
})

function mapStateToProps (state, props) {
    const deck = props.navigation.getParam('deck')

    return {
        deck
    }
}

export default connect(mapStateToProps)(Quiz)