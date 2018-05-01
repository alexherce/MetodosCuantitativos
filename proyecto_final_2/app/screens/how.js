import React, { Component } from 'react';
import { StyleSheet, Text, Button, View, ScrollView } from 'react-native';
import { RkTabView, RkText, RkButton } from 'react-native-ui-kitten';

export class HowScreen extends Component {

  static navigationOptions = {
    title: 'Acerca',
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView automaticallyAdjustContentInsets={true} style={styles.screen}>
          <Text style={styles.h2}>
            - ¿Cómo funciona? -
          </Text>
          <Text style={styles.instructions}>
            La aplicación utiliza el Wi-Fi de tu smartphone para detectar a que MAC Address estás conectado.
            Luego, lo compara con una lista de MAC Address que contiene todos los access points del campus y las ubicaciones de cada uno.
            La lista contiene el edificio, piso y salón/oficina donde se encuentran ubicados cada uno de los access points del campus.
          </Text>
          <Text style={styles.h2}>
            - ¿Qué redes están soportadas? -
          </Text>
          <Text style={styles.instructions}>
            La aplicación necesita conexión a la red Wi-Fi Tec o ITESM. Si no te encuentras conectado a cualquiera de estas dos redes, no funcionará.
          </Text>
          <Text style={styles.h2}>
            - ¿Necesita GPS? -
          </Text>
          <Text style={styles.instructions}>
            La aplicación no necesita GPS. El GPS podría detectar tu posición horizontal, pero sería muy dificil saber en que piso del edificio estás. La lista de Access Points contiene información detallada hasta del salón en el que te encuentras.
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
  }
});
