import React from 'react'
import { View, StatusBar } from 'react-native'
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Decks from './components/Decks'
import NewDeck from './components/NewDeck'
import DeckDetails from './components/DeckDetails'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { setLocalNotification } from './utils/notifications'

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View> 
  )
}

const Stack = createStackNavigator({
  Decks: {
    screen: Decks
  },
  DeckDetails: {
    screen: DeckDetails
  },
  AddCard: {
    screen: AddCard
  },
  Quiz: {
    screen: Quiz
  }
})

const StackContainer = createAppContainer(Stack)

const Tab = createBottomTabNavigator(
  {
    StackContainer: {
      screen: StackContainer
    },
    NewDeck: {
      screen: NewDeck
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: navigation.state.routeName === 'StackContainer' ? 'Decks' : 'New Deck',
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'StackContainer') {
          iconName = `ios-apps`
        } else if (routeName === 'NewDeck') {
          iconName = `ios-create`
        }

        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#2980b9',
      inactiveTintColor: 'gray',
    },
  }
)

const TabContainer = createAppContainer(Tab)

export default class App extends React.Component {
  componentDidMount () {
    setLocalNotification()
  }

  render () {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor='white' barStyle='dark-content' />
          <TabContainer />
        </View>
      </Provider>
    )
  }
}
