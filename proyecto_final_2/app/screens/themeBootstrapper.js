import {RkTheme} from 'react-native-ui-kitten';

export let bootstrap = () => {

  RkTheme.setColor('accent', '#ed1c4d');

  RkTheme.setType('RkCard', 'basic', {
    container: {
      marginBottom: 10
    }
  });

  RkTheme.setType('RkTabView', 'main', {
  backgroundColor: 'transparent',
  color: 'black',
  borderColor: '#000',
  tabContainer: {
    margin: 5,
    padding: 1,
    borderRadius: 30,
    overflow: 'hidden',
  },
});

 RkTheme.setType('RkTabView', 'mainSelected', {
  backgroundColor: '#000',
  color: 'white',
  borderColor: '#000'
});

RkTheme.setType('RkButton', 'dark', {
  backgroundColor: 'black',
  color: 'white',
  borderRadius: 10,
});

};
