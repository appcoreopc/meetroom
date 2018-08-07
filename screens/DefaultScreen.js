import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text, Button,
  TouchableOpacity,
  View
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import { styles } from '../shared/css/style';
import { Icon, List, ListItem, Avatar } from 'react-native-elements';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  list = [
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President', 
      icon: 'av-timer'
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman',
      icon: 'flight-takeoff'
    },
  ];  
    
  render() {
    
    return (
      <View style={styles.containerSchedule}>

      <Text style={{fontSize: 18, color:'#3a4354', fontWeight : 'bold'}}> My Schedule </Text> 

      <List containerStyle={{marginBottom: 20}}>
        {
          this.list.map((l, i) => (

            <ListItem     
              key={i}
              title={              
              <View>
                <Text style={{fontSize:14, color:'#3a4354'}}> {l.name} </Text> 
              </View>    
              }
              subtitle={
              <View style={{paddingTop: 6}}>
                <Text style={{fontSize:10, color:'#d2d6f3'}}> {l.subtitle} </Text> 
              </View>             
              }

              rightIcon={
              <View>               
                <Icon reverse name='calendar' type='font-awesome' color='#394DCF' />
              </View>   

              }
             
            />
          ))
        }
    </List>
     
      
      </View>
    );
  }
  
  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
        </Text>
      );
      
      return (
        <Text style={styles.developmentModeText}>
        Development mode is enabled, your app will be slower but you can use useful development
        tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
        You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }
  
  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };
  
  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

