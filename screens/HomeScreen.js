import React from 'react';
import {
  Image, Platform,ScrollView, StyleSheet, Text, Alert, TouchableOpacity, View
} from 'react-native';
import { Constants, ImagePicker, Permissions } from 'expo';
import { MonoText } from '../components/StyledText';
import { styles } from '../shared/css/style';
import { Icon, Button } from 'react-native-elements';
import { ClientApi } from '../shared/clientApi';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) { 
    super(props);
  }
  
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
      <Button style={styles.defaultButton} buttonStyle={{
        borderRadius: 5, backgroundColor: "#394dcf"
       }} onPress={this._takePhoto} title="Take Photo" accessibilityLabel="Learn more about this purple button"
      />               
      </View>
      
      <View style={styles.viewButton}>      
      <Button style={styles.defaultButton} buttonStyle={{
        borderRadius: 5,  backgroundColor: "#394dcf"
        }} onPress={()=> {

          let a = new ClientApi();
          a.getNewsFeed();
          console.log('finallly fired!');
        
         this.props.navigation.navigate('DefaultScreen');
      }} title="Schedule" accessibilityLabel="Learn more about this purple button"
      />          
      
      </View>           
      
      </View>
    );
  } 

  _takePhoto = async () => {
      
    const {
      status: cameraPerm
    } = await Permissions.askAsync(Permissions.CAMERA);
    
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    
    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        //allowsEditing: true,
        //aspect: [4, 3],
      });
            
      this._handleImagePicked(pickerResult);
    }
  };
    
  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;
    let sendImageToServer = this.sendImageToServer;
    let uploadImageAsync = this.uploadImageAsync;
    
    try {
      this.setState({
        uploading: true

      });
      
      if (!pickerResult.cancelled) {

      console.log('ok click');

       await prompt(
          'Enter password',
          'Enter your password to claim your $1.5B in lottery winnings',
          [
           {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
           {text: 'OK', onPress: password => {
              console.log('OK Pressed. Send ..');
              sendImageToServer(uploadImageAsync, pickerResult);        
           } 
           },
          ],
          {
              type: 'secure-text',
              cancelable: false,
              defaultValue: 'test',
              placeholder: 'placeholder'
          }
      );
               
      this.setState({
          image: uploadResult.location
        });
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      //alert('Upload failed, sorry :(');
    } finally {
      this.setState({
        uploading: false
      });
    }
  };  

  async sendImageToServer(uploadImageAsync, pickerResult) { 
    console.log('sending image to server');
    uploadResponse = await uploadImageAsync(pickerResult.uri);
    uploadResult = await uploadResponse.json();
  }

  async uploadImageAsync(uri) {
    
    let apiUrl = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload';
    
    // Note:
    // Uncomment this if you want to experiment with local server
    //
    // if (Constants.isDevice) {
    //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
    // } else {
    //   apiUrl = `http://localhost:3000/upload`
    // }
    
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];
    
    let formData = new FormData();
    formData.append('photo', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
    
    let options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
    
    return fetch(apiUrl, options);
  }    

}

