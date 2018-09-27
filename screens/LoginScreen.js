import React from 'react';
import {
  ActivityIndicator, ScrollView, TextInput, Text, View
} from 'react-native';
import { styles } from '../shared/css/style';
import { Icon, Button } from 'react-native-elements';
import { AppConfig } from '../shared/AppConfig';
import { ActivitySpinner } from '../shared/ActivitySpinner';
import { UNABLE_SIGNON_MESSAGE, LOGIN_TXT, LOGIN_ACCESSIBILITY_TXT, DEFAULT_USERNAME_TXT,  DEFAULT_PASSWORD_TXT } from '../constants/AppConstant';

export default class LoginScreen extends React.Component {
  
  static navigationOptions = {
    header: null,
  };
  
  constructor(props) {   
    
    super(props);  
    
    this.state = { 
      username : DEFAULT_USERNAME_TXT, 
      password : DEFAULT_PASSWORD_TXT,
      loading : false,
      message : ''
    };  
  }  
  
  navigateHome() {   
    this.props.navigation.navigate(AppConfig.HOMESCREEN);
  }
  
  async authenticate(username, password) { 
          
    console.log('logging in', username, password);

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
        this.setState({loading : false});
        console.error(error);        
      }      
    }
  }
  
  validateUserCredentials(jsonResponse) {  
   
    if (jsonResponse && jsonResponse.status == "true") {
      global.username = jsonResponse.username;      
      this.navigateHome();    
    }
    else {
      this.setState({message : UNABLE_SIGNON_MESSAGE});
      this.setState({loading : false});
    }
  }
  
  render() {
    
    return (
      
    <View style={styles.container}>
            
    
    <ScrollView style={styles.topLoginContainer}>
    
        <Text style={styles.tabBarInfoTextBold}> Please login   </Text> 
        <Text style={styles.tabBarInfoText}>Let's get personal</Text>
        
        <View style={styles.viewButton}>      
       
        <TextInput
        style={{height: 40, color: '#fff'}}
        placeholder={DEFAULT_USERNAME_TXT}
        onChangeText={(text) => this.setState({username : text})} 
        />
        
        <TextInput secureTextEntry={true} 
        style={{height: 40,  color: '#fff'}}
        placeholder={DEFAULT_PASSWORD_TXT} onChangeText={(text) => this.setState({password : text})}
        />

        <Text  style={styles.statusMessageText}> {this.state.message} </Text>
      
        <View style={styles.containerLoginButton}> 
              
            <Button style={styles.defaultButton} buttonStyle={{
              borderRadius: 5, backgroundColor: "#394dcf"
            }} onPress={() => {     
             
              this.setState({loading : true});              
              this.authenticate(this.state.username, this.state.password);
              
            }} title={LOGIN_TXT} accessibilityLabel={LOGIN_ACCESSIBILITY_TXT}
            />         

        </View>

          {this.state.loading &&
                  <View style={styles.loading}>
                      <ActivitySpinner isBusy={this.state.loading} />
                  </View>
          } 
        
        </View>         
        
    </ScrollView>
    
    <ScrollView style={styles.bottomLoginContainer} contentContainerStyle={styles.contentContainer}>
    
      <View>
          <Icon name='lock' type='font-awesome' color='#517fa4' size={200} />             
      </View>
    
    </ScrollView>    
    
    </View>
  );
 }    
}

