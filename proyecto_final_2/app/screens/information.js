import React, { Component } from 'react';
import { StyleSheet, Text, Button, View, ScrollView } from 'react-native';
import { RkTabView, RkText, RkButton } from 'react-native-ui-kitten';

export class InformationScreen extends Component {

  static navigationOptions = {
    title: 'Información',
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView automaticallyAdjustContentInsets={true} style={styles.screen}>
          <RkButton rkType='dark xlarge' style={styles.button} onPress={() => this.props.navigation.navigate('How')}>Cómo funciona</RkButton>

          <RkButton rkType='dark xlarge' style={styles.button} onPress={() => this.props.navigation.navigate('Team')}>Equipo</RkButton>

          <RkButton rkType='danger xlarge' style={styles.button}>Contactos de emergencia</RkButton>
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
    marginBottom: 10,
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
  }
});
