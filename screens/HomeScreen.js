import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text, Button,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import { styles } from '../shared/css/style';
import { Icon } from 'react-native-elements';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  navigateDefaultScreen = () =>  {
    alert('test');
    this.props.navigation.navigate('DefaultScreen');
  }
  
  render() {
    return (
      <View style={styles.container}>
      
      <ScrollView style={styles.blueContainer} contentContainerStyle={styles.contentContainer}>
      
      <View>
      <Icon name='sc-telegram' type='evilicon' color='#517fa4' size={240} />             
      </View>
      
      </ScrollView>
      
      <ScrollView style={styles.whiteContainer}>
      <Text style={styles.tabBarInfoTextBold}> Find lessons near you  </Text> 
      <Text style={styles.tabBarInfoText}>Allow Meetroom to use your location to find only relevant lessons and students in your area.</Text>
      </ScrollView>
      
      <View style={styles.viewButton}> 
      <Button style={styles.defaultButton} onPress={()=> {
        alert('test');
      }} title="Take Photo" accessibilityLabel="Learn more about this purple button"
      />               
      </View>
      
      <View style={styles.viewButton}>      
      <Button style={styles.defaultButton} onPress={()=> {
         this.props.navigation.navigate('DefaultScreen');
      }} title="Schedule" accessibilityLabel="Learn more about this purple button"
      />          
      
      </View>           
      
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

