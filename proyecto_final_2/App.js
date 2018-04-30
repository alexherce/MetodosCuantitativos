import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Text, Button, View, Image, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import * as Screens from './app/screens';
import {bootstrap} from './app/screens/themeBootstrapper'

bootstrap();

class DetailsScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}

class AboutScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>About Screen</Text>
      </View>
    );
  }
}

const HomeStack = StackNavigator(
  {
    Home: {
      screen: Screens.MainScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const EvacuateStack = StackNavigator(
  {
    Evacua: {
      screen: Screens.EvacuateScreen,
    },
  },
  {
    initialRouteName: 'Evacua',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const InfoStack = StackNavigator(
  {
    Settings: {
      screen: Screens.SettingsScreen,
    },
    About: {
      screen: AboutScreen,
    },
  },
  {
    initialRouteName: 'Settings',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const RootStack = TabNavigator(
  {
    Home: { screen: HomeStack },
    Evacua: { screen: EvacuateStack },
    Info: { screen: InfoStack },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;

        if (routeName === 'Home') {
          iconName = `ios-albums${focused ? '' : '-outline'}`;
        } else if (routeName === 'Evacua') {
          iconName = `ios-exit${focused ? '' : '-outline'}`;
        } else if (routeName === 'Info') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#f4511e',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: 'black',
      }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false,
  }
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 20
  },
  screen: {
    backgroundColor: '#f0f1f5',
    padding: 12
  },
});
