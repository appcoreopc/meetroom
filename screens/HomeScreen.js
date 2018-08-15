import React from 'react';
import {
  Image, Platform,ScrollView, StyleSheet, Text, Alert, TouchableOpacity, View
} from 'react-native';
import Expo, { SQLite, Constants, ImagePicker, Permissions } from 'expo';
import { MonoText } from '../components/StyledText';
import { styles } from '../shared/css/style';
import { Icon, Button } from 'react-native-elements';
import { ClientApi } from '../shared/clientApi';
import { MeetroomDb } from '../shared/meetroomdb';

const db = SQLite.openDatabase('meetroom.db');

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) { 
    super(props);       
  }  

  async componentDidMount() {   

   console.log('query db...');
   var d = new MeetroomDb(); 
   let status = await d.checkUserRegistered();
   console.log('current get status with promise');
   console.log('a state ' + status);
   status = false;
   if (status === false) {
         this.props.navigation.navigate('LoginScreen');
   }

  //  db.transaction(tx => {
  //   tx.executeSql(
  //     'create table if not exists items (id integer primary key not null, done int, value text);', 0, (a,b) => {
  //      console.log('success');
  //      console.log(a);
  //      console.log(b);
  //     }, 
  //    () => { 
  //     console.log('error creating table..');
  //   });
  // });
  
   //  db.transaction(tx => {
  //   tx.executeSql(
  //     'insert into items(done, value) values (1, "test1")', 0,  (a,b) => {
  //       console.log('success insert');
  //       console.log(a);
  //       console.log(b);
  //      }, 
  //     () => { 
  //      console.log('error creating table..');
  //    }
  //   );
  // });

  // db.transaction(tx => {
  //   tx.executeSql(
  //     'select id from items', 0,  (a,b) => {
  //       console.log('success get');
  //       console.log(a);
  //       console.log(b);
  //      }, 
  //     () => { 
  //      console.log('error creating table..');
  //    }
  //   );
  // });
   
  }
  
  navigateDefaultScreen = () =>  {
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

