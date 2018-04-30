import React, { Component } from 'react';
import { StyleSheet, Text, Button, View, Image, ScrollView } from 'react-native';
import {UtilStyles} from './style';
import { RkCard, RkText } from 'react-native-ui-kitten';


export class SettingsScreen extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView automaticallyAdjustContentInsets={true} style={[UtilStyles.container, styles.screen]}>
          <RkCard>
            <View rkCardHeader>
              <View>
                <RkText rkType='header'>Header</RkText>
                <RkText rkType='subtitle'>Subtitle</RkText>
              </View>
            </View>
            <Image rkCardImg source={require('../assets/screensImage.png')}/>
            <View rkCardContent>
              <Text> quick brown fox jumps over the lazy dog</Text>
            </View>
          </RkCard>

          <RkCard>
            <View rkCardHeader>
              <View>
                <RkText rkType='header'>Header</RkText>
                <RkText rkType='subtitle'>Subtitle</RkText>
              </View>
            </View>
            <Image rkCardImg source={require('../assets/screensImage.png')}/>
            <View rkCardContent>
              <Text> quick brown fox jumps over the lazy dog</Text>
            </View>
          </RkCard>
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
  }
});
