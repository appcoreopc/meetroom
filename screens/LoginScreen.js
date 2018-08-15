import React from 'react';
import {
  Image, Platform,ScrollView, StyleSheet, TextInput, Text, Alert, TouchableOpacity, View
} from 'react-native';
import { Constants, ImagePicker, Permissions } from 'expo';
import { MonoText } from '../components/StyledText';
import { styles } from '../shared/css/style';
import { Icon, Button } from 'react-native-elements';
import { ClientApi } from '../shared/clientApi';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };  
  
  constructor(props) {     
    super(props);       
    this.state = { username : 'username', password : 'password' };      
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
        
        console.log(this.state.username);
        
        console.log(this.state.password);
        
      }} title="Login" accessibilityLabel="Learn more about this purple button"
      />               
      </View>
      
      </View>           
      
      </View>
    );
  }  

}

