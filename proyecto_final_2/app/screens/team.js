import React, { Component } from 'react';
import { StyleSheet, Text, Button, View, ScrollView } from 'react-native';
import { RkTabView, RkText, RkButton } from 'react-native-ui-kitten';

export class TeamScreen extends Component {

  static navigationOptions = {
    title: 'Equipo',
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView automaticallyAdjustContentInsets={true} style={styles.screen}>
          <Text style={styles.bigblack}>
            MARGOT DUEK
          </Text>
          <Text style={styles.bigblack}>
            ISAAC CARRADA
          </Text>
          <Text style={styles.bigblack}>
            RODRIGO CASTAÑÓN
          </Text>
          <Text style={styles.bigblack}>
            JACOBO CALDERÓN
          </Text>
          <Text style={styles.bigblack}>
            ALEJANDRO HERCE
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  h1: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 5,
  },
  h2: {
    fontSize: 18,
    textAlign: 'center',
    margin: 5,
  },
  instructions: {
    color: '#333333',
    margin: 2.5,
    fontSize: 16
  },
  screen: {
    padding: 12
  },
  button: {
    marginTop: 10,
  },
  bigblack: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
  }
});
