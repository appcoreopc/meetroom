import React from 'react';
import {
  Image, Platform,ScrollView, StyleSheet, Text, Alert, TouchableOpacity, View
} from 'react-native';
import { Constants, ImagePicker, Permissions } from 'expo';
import { MonoText } from '../components/StyledText';
import { styles } from '../shared/css/style';
import { Icon, Button } from 'react-native-elements';

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
      <Button style={styles.defaultButton} buttonStyle={{
        borderRadius: 5, backgroundColor: "#394dcf"
       }} onPress={this._takePhoto} title="Take Photo" accessibilityLabel="Learn more about this purple button"
      />               
      </View>
      
      <View style={styles.viewButton}>      
      <Button style={styles.defaultButton} buttonStyle={{
        borderRadius: 5,  backgroundColor: "#394dcf"
        }} onPress={()=> {
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

    try {
      this.setState({
        uploading: true

      });
      
      if (!pickerResult.cancelled) {

        await Alert.alert(
          'Alert Title',
          'My Alert Msg',
          [
            {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => {

              console.log('OK Pressed. Send ..');
              console.log(this.uploadImageAsync);

              // Push this into a new asnyc function 
              uploadResponse = this.uploadImageAsync(pickerResult.uri);
              uploadResult = uploadResponse.json();



            }},
          ],
          { cancelable: false }
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

