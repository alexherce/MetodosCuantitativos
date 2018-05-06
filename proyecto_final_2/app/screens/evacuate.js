import React, { Component } from 'react';
import { StyleSheet, Text, Button, View, Image, ScrollView, NetInfo, Alert } from 'react-native';
import { RkCard, RkText, RkButton } from 'react-native-ui-kitten';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NetworkInfo } from 'react-native-network-info';
import update from 'immutability-helper';
import {UtilStyles} from './style';
import {dataTec, dataStairs, dataExits} from '../data/data';

const initialState = {
  networkDetails: {
    bssid: "Not Available",
    prevBssid: "",
  },
  refresh: 0,
  indexLocation: "-1",
  currentLocation: {
    nombre: "Error",
    bssid: "Error",
    edificio: 0,
    piso: 0,
    nextEdificio: 0,
    nextPiso: 0,
    instrucciones: "Ubicacion no disponible. Conectate a la red Tec o ITESM dentro del campus."
  },
  route: []
};

class AdditionalInfo extends Component {
  render() {
    return (
      <Text style={styles.additionalInstructionsSmall}>- {this.props.item.data}</Text>
    );
  }
}

class Item extends Component {
  render() {
    return (
      <RkCard>
        <View rkCardHeader>
          <View>
            <RkText rkType='header'>#{this.props.indx.toString()} | Aulas {this.props.item.currentPos.edificio.toString()} Nivel {this.props.item.currentPos.piso.toString()}</RkText>
          </View>
        </View>
        <View rkCardContent>
          <Text style={styles.instructions}>{this.props.item.instrucciones} Aulas {this.props.item.edificio.toString()} Nivel {this.props.item.piso.toString()}</Text>

          {this.props.item.stairInfo.length > 0 ? (
            <Text style={styles.additionalInstructions}>Escaleras en el piso: </Text>
          ) : ( <Text></Text> )}
          {this.props.item.stairInfo.map((stairs, i)=><AdditionalInfo key={i} indx={i + 1} item={stairs} />)}

          {this.props.item.exitInfo.length > 0 ? (
            <Text style={styles.additionalInstructions}>Salidas en el piso: </Text>
          ) : ( <Text></Text> )}
          {this.props.item.exitInfo.map((exits, i)=><AdditionalInfo key={i} indx={i + 1} item={exits} />)}
        </View>
      </RkCard>
    );
  }
}

export class EvacuateScreen extends Component {
  constructor(props) {
    super(props);
    this.getNetworkData = this.getNetworkData.bind(this);
    this.state = initialState;

    this.getNetworkData();
  }

  static navigationOptions = {
    title: 'Ruta de Evacuación'
  };

  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  planRoute = (bssidIndex) => {

    var tempRoute = [];
    var filterResults = [];
    var exited = false;
    var filterIndex = 0;

    var currentPos = {edificio: dataTec[bssidIndex].edificio, piso: dataTec[bssidIndex].piso};
    var filter = {edificio: dataTec[bssidIndex].nextEdificio, piso: dataTec[bssidIndex].nextPiso};

    do {
      filterResults = dataTec.filter(function(item) {
        for (var key in filter) {
          if (item[key] === undefined || item[key] != filter[key])
          return false;
        }
        return true;
      });

      if(filterResults.length > 0) {

        if(filterResults.length > 1) {
          filterIndex = this.getRandomInt(0, filterResults.length - 1);
        } else {
          filterIndex = 0;
        }

        if(currentPos.piso > filter.piso) {
          filterResults[filterIndex].instrucciones = "Baja a";
        } else if (currentPos.piso < filter.piso) {
          filterResults[filterIndex].instrucciones = "Sube a";
        } else if (currentPos.edificio != filter.edificio) {
          filterResults[filterIndex].instrucciones = "Dirígete a";
        } else {
          filterResults[filterIndex].instrucciones = "Dirígete a";
        }

        var floorFilter = currentPos;
        var filterStairs = dataStairs.filter(function(item) {
          for (var key in floorFilter) {
            if (item[key] === undefined || item[key] != floorFilter[key])
            return false;
          }
          return true;
        });

        if (filterStairs.length > 0) {
          filterResults[filterIndex].stairInfo = filterStairs[0].info;
        } else {
          filterResults[filterIndex].stairInfo = [];
        }

        filterResults[filterIndex].exitInfo = [];

        filterResults[filterIndex].currentPos = currentPos;

        tempRoute.push(filterResults[filterIndex]);
        currentPos = {edificio: filterResults[filterIndex].edificio, piso: filterResults[filterIndex].piso};
        filter = {edificio: filterResults[filterIndex].nextEdificio, piso: filterResults[filterIndex].nextPiso};
      }

      if (filter.edificio == "exit") {
        exited = true;
      }
    } while (!exited);

    // Find exit information
    var exitFilter = {edificio: currentPos.edificio, piso: filter.piso};
    var filterExits = dataExits.filter(function(item) {
      for (var key in exitFilter) {
        if (item[key] === undefined || item[key] != exitFilter[key])
        return false;
      }
      return true;
    });

    var exits = [];
    if (filterExits.length > 0) {
      exits = filterExits[0].info;
    }

    // Push exit instruction
    tempRoute.push({
      nombre: "Salida",
      currentPos: currentPos,
      edificio: currentPos.edificio,
      piso: filter.piso,
      instrucciones: "Sal del edificio por",
      stairInfo: [],
      exitInfo: exits
    });

    // Add route and current location to state
    this.setState({
      currentLocation: update(this.state.currentLocation, {$set: dataTec[bssidIndex]}),
      route: update(this.state.route, {$push: tempRoute})
    })
  }

  refreshNetworkData = () => {
    console.log("Reset State");

    this.setState(initialState);

    this.getNetworkData();
  }

  getNetworkData = () => {
    console.log("Get Network Data");

    // Verify if user is connected to wifi
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      console.log('Detect type of connection: ' + connectionInfo.type);

      if (connectionInfo.type == "wifi") {
        // Get BSSID and update state
        NetworkInfo.getBSSID(bssid => {
          var index = -1;

          this.setState((prevState) => {
            index = dataTec.map(function (obj) { return obj.bssid; }).indexOf(bssid);

            return {
              networkDetails: update(this.state.networkDetails, {bssid: {$set: bssid}, prevBssid: {$set: prevState.networkDetails.bssid}}),
              indexLocation: update(this.state.indexLocation, {$set: index.toString()})
            };
          })

          // Plan route after obtaining location
          if(index > -1) {
            this.planRoute(index);
          } else {
            Alert.alert(
              'No se econtró tu ubicación',
              'No se pudo encontrar tu ubicación con Wi-Fi. Para que la app funcione, necesitas estar conectado a la red Tec o ITESM dentro del campus y estar en alguno de los edificios de aulas.',
              [
                {text: 'OK', onPress: () => console.log('OK')},
              ],
              { cancelable: false }
            )
          }
        });
      } else {
        console.log("Not connected to wifi");

        Alert.alert(
          'No estas conectado al Wi-Fi',
          'Para que la app funcione, necesitas estar conectado a la red Tec o ITESM dentro del campus.',
          [
            {text: 'OK', onPress: () => console.log('OK')},
          ],
          { cancelable: false }
        )
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView automaticallyAdjustContentInsets={true} style={[UtilStyles.container, styles.screen]}>
          <RkCard>
            <View rkCardHeader>
              <View>
                <RkText rkType='header'>RUTA DESDE MI UBICACIÓN</RkText>
                <RkText rkType='subtitle'>sigue la ruta para evacuar</RkText>
              </View>
            </View>
            <View rkCardContent>
              <Text style={styles.instructions}>
                Ubicación: {this.state.currentLocation.nombre}
              </Text>
              <Text style={styles.instructionsSmall}>
                Aulas {this.state.currentLocation.edificio.toString()} Nivel {this.state.currentLocation.piso.toString()}
              </Text>
              <Text style={styles.instructionsSmall}>
                BSSID: {this.state.networkDetails.bssid}
              </Text>
              <Text>La ubicación se calcula con el Wi-Fi de tu telefono, es necesario estar conectado a la red Tec o ITESM. Si quieres una nueva ruta, presiona el botón de recargar.</Text>
            </View>
            <View rkCardFooter>
              <RkButton rkType='dark small' onPress={() => this.props.navigation.navigate('How')}>Mas Info</RkButton>
              <RkButton rkType='dark small' onPress={this.refreshNetworkData}>Actualizar Ubicación</RkButton>
            </View>
          </RkCard>

          {this.state.route.map((option, i)=><Item key={i} indx={i + 1} item={option} />)}
        </ScrollView>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  screen: {
    backgroundColor: '#f0f1f5',
    padding: 12
  },
  buttonIcon: {
    marginRight: 7,
    fontSize: 19.7,
  },
  footer: {
    marginHorizontal: 16
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 17
  },
  dot: {
    fontSize: 6.5,
    color: '#0000008e',
    marginLeft: 2.5,
    marginVertical: 10,
  },
  floating: {
    width: 56,
    height: 56,
    position: 'absolute',
    zIndex: 200,
    right: 16,
    top: 173,
  },
  footerButtons: {
    flexDirection: 'row'
  },
  overlay: {
    justifyContent: 'flex-end',
    paddingVertical: 23,
    paddingHorizontal: 16
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
    fontSize: 16
  },
  instructionsSmall: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 12
  },
  additionalInstructions: {
    color: '#333333',
    marginTop: 10,
    marginBottom: 5,
    fontSize: 12,
    fontWeight: 'bold'
  },
  additionalInstructionsSmall: {
    color: '#333333',
    marginBottom: 5,
    fontSize: 12
  },
});
