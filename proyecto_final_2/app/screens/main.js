import React, { Component } from 'react';
import { StyleSheet, Text, Button, View, ScrollView } from 'react-native';
import { RkTabView, RkText, RkButton } from 'react-native-ui-kitten';

export class MainScreen extends Component {

  static navigationOptions = {
    title: 'evacuaTec',
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView automaticallyAdjustContentInsets={true} style={styles.screen}>
          <Text style={styles.bigblack}>
            ¿Sismo? Qué hacer
          </Text>

          <RkTabView rkType='main'>
            <RkTabView.Tab title={'Durante'}>
              <Text style={styles.h2}>
                - DURANTE -
              </Text>
              <Text style={styles.instructions}>
                1.- Mantén la calma y no intentes desplazarte.
              </Text>
              <Text style={styles.instructions}>
                2.- No trates de evacuar el edificio, el sismo dura pocos segundos. Es posible que termine antes de que lo hayas logrado. Busca un lugar seguro y aléjate de ventanas, cristales y objetos que puedan caer, como proyectores, lámparas y bocinas.
              </Text>
              <Text style={styles.instructions}>
                3.- Si el sismo es intenso, busca refugio abajo de un mueble, junto a una columna o en una esquina. Si el sismo es muy intenso, tírate al suelo y adopta la posición de seguridad.
              </Text>
              <Text style={styles.instructions}>
                4.- No permanezcas en escaleras o en puentes de intercomunicación.
              </Text>
            </RkTabView.Tab>
            <RkTabView.Tab title={'Después'}>
              <Text style={styles.h2}>
                - DESPUÉS -
              </Text>
              <Text style={styles.instructions}>
                1.- Evacúa el edificio. No corras, empujes ni grites para evitar panico.
              </Text>
              <Text style={styles.instructions}>
                2.- No uses elevadores ni puentes de intercomunicación. Si te encuentras en EGADE (Aulas 5), no uses las escaleras centrales del edificio.
              </Text>
            </RkTabView.Tab>
          </RkTabView>

          <RkButton rkType='danger xlarge' style={styles.button} onPress={() => this.props.navigation.navigate('Evacua')}>Ruta de Evacuación</RkButton>

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
    textAlign: 'center'
  }
});
