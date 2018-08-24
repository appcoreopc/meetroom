import React from 'react';
import {
  Image, Platform,ScrollView, StyleSheet, TextInput, Text, Alert, TouchableOpacity, View
} from 'react-native';
import { Constants, ImagePicker, Permissions } from 'expo';
import { MonoText } from '../components/StyledText';
import { styles } from '../shared/css/style';
import { Icon, Button } from 'react-native-elements';
import { ClientApi } from '../shared/clientApi';
import { AppConfig } from '../shared/AppConfig';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };  

  constructor(props) {        
    super(props);       
    this.state = { username : 'username', password : 'password' };      
  }
    
  async navigateHome() {   
    this.props.navigation.navigate(AppConfig.HOMESCREEN);
  }

  async authenticate(username, password) { 
  
    if (username && password) {

      let apiUri = AppConfig.AUTHENTICATION_URL;

      try {
      
         let response = await fetch(apiUri, { 
          method: AppConfig.POST,
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username : username.trim(), password : password.trim()})
        });

        let responses = await response.json();
        console.log(responses);
        this.validateUserCredentials(responses);

      } catch (error) {
        console.error(error);
      }    
    }
  }
  
  async validateUserCredentials(jsonResponse) {    
    console.log('validate user credentials');        
    if (jsonResponse && jsonResponse.status == "true") {
      this.navigateHome();
    }
    else {
      // message and prompt user //
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
      
      <ScrollView style={styles.blueContainer} contentContainerStyle={styles.contentContainer}>
      
      <View>
      <Icon name='lock' type='font-awesome' color='#517fa4' size={240} />             
      </View>
      
      </ScrollView>
      
      <ScrollView style={styles.whiteLoginContainer}>
      <Text style={styles.tabBarInfoTextBold}> Please login   </Text> 
      <Text style={styles.tabBarInfoText}>Allow us to serve you better</Text>
      </ScrollView>
      
      <View style={styles.viewButton}>      
      
      <TextInput
      style={{height: 40}}
      placeholder="Username"
      onChangeText={(text) => this.setState({username : text})} 
      />
      
      <TextInput
      style={{height: 40}}
      placeholder="Password"
      onChangeText={(text) => this.setState({password : text})}
      />
      
      <View style={styles.containerLoginButton}> 
      <Button style={styles.defaultButton} buttonStyle={{
        borderRadius: 5, backgroundColor: "#394dcf"
      }} onPress={() => {     
        
        this.authenticate(this.state.username, this.state.password);
        
      }} title="Login" accessibilityLabel="Learn more about this purple button"
      />               
      </View>
      
      </View>           
      
      </View>
    );
  }  
  
}
