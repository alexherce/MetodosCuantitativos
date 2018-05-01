import React, { Component } from 'react';
import { StyleSheet, Text, Button, View, ScrollView } from 'react-native';
import { RkTabView, RkText, RkButton } from 'react-native-ui-kitten';

export class ContactScreen extends Component {

  static navigationOptions = {
    title: 'Contactos',
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView automaticallyAdjustContentInsets={true} style={styles.screen}>
          <Text style={styles.h2}>
            - Emergencias -
          </Text>
          <Text style={styles.instructions}>
            911
          </Text>

          <Text style={styles.h2}>
            - Seguridad y planta física -
          </Text>
          <Text style={styles.instructions}>
            1.- Evacúa el edificio. No corras, empujes ni grites para evitar panico.
          </Text>
          <RkButton rkType='danger xlarge' style={styles.button} onPress={() => this.props.navigation.navigate('Evacua')}>Ver Ruta de Evacuación</RkButton>
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
  }
});
