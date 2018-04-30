import React, { Component } from 'react';
import { StyleSheet, Text, Button, View, Image, ScrollView } from 'react-native';
import { RkCard, RkText, RkButton } from 'react-native-ui-kitten';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NetworkInfo } from 'react-native-network-info';
import update from 'immutability-helper';
import {UtilStyles} from './style';
import {dataTec} from '../data/data';

class Item extends Component {
  render() {
    return (
      <RkCard>
        <View rkCardHeader>
          <View>
            <RkText rkType='header'>#{this.props.indx.toString()}</RkText>
          </View>
        </View>
        <View rkCardContent>
          <Text style={styles.instructions}>{this.props.item.instrucciones} Aulas {this.props.item.edificio.toString()} Nivel {this.props.item.piso.toString()}</Text>
        </View>
      </RkCard>
    );
  }
}

export class EvacuateScreen extends Component {
  constructor(props) {
    super(props);
    this.getNetworkData = this.getNetworkData.bind(this);
    this.state = {
      networkDetails: {
        ssid: "Not Available",
        bssid: "Not Available",
        prevSsid: "",
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

    this.getNetworkData();
  }

  static navigationOptions = {
    title: 'Ruta de Evacuación',
    headerRight: (
      <Ionicons.Button name='ios-refresh' size={25} color='white' backgroundColor='transparent' onPress={this.getNetworkData} />
    ),
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

    if (filter.edificio == "exit") {
      tempRoute.push({
        nombre: "Salida",
        edificio: currentPos.edificio,
        piso: filter.piso,
        instrucciones: "Sal del edificio por"
      });
    } else {
      do {
        filterResults = dataTec.filter(function(item) {
          for (var key in filter) {
            if (item[key] === undefined || item[key] != filter[key])
            return false;
          }
          return true;
        });

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

        tempRoute.push(filterResults[filterIndex]);
        currentPos = {edificio: filterResults[filterIndex].edificio, piso: filterResults[filterIndex].piso};
        filter = {edificio: filterResults[filterIndex].nextEdificio, piso: filterResults[filterIndex].nextPiso};

        if (filter.edificio == "exit") {
          exited = true;
        }
      } while (!exited);
      tempRoute.push({
        nombre: "Salida",
        edificio: currentPos.edificio,
        piso: filter.piso,
        instrucciones: "Sal del edificio por"
      });
    }

    this.setState({
      currentLocation: update(this.state.currentLocation, {$set: dataTec[bssidIndex]}),
      route: update(this.state.route, {$push: tempRoute})
    })
  }

  getNetworkData = () => {
    console.log("Refresh Network Data");
    // Get SSID
    NetworkInfo.getSSID(ssid => {
      this.setState((prevState) => {
        return {
          networkDetails: update(this.state.networkDetails, {ssid: {$set: ssid}, prevSsid: {$set: prevState.networkDetails.ssid}})
        };
      })
    });

    // Get BSSID
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
              <RkButton rkType='small outline'>Learn More</RkButton>
              <RkButton rkType='small'>Read later</RkButton>
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
});
