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
import { AppConfig } from '../shared/AppConfig';
import Dialog from "react-native-dialog";

const db = SQLite.openDatabase('meetroom.db');

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  
  constructor(props) {         
    super(props);      
    this.state = { 
      showPrompt : false,
      photoUri : '', 
      photoDescripton : '',
      photoPickerResult : false
    };   
  }  
  
  async componentDidMount() { 
    
    // console.log('query db...');
    // var d = new MeetroomDb(); 
    // let status = await d.checkUserRegistered();
    // console.log('current get status with promise');
    // console.log('a state ' + status);
    //global.username = 'mark';
    //status = true;
    
    console.log('globalusername', global.username);
    
    if (!global.username) {
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
      
      <Dialog.Container visible={this.state.showPrompt}>
      <Dialog.Title>Take a photo</Dialog.Title>
      <Dialog.Description>
        Tell us about what's your photo about?
      </Dialog.Description>
      
      <Dialog.Input label="Photo description" onChangeText={(text) => this.setState({photoDescripton : text})}  />
      
      <Dialog.Button label="Upload Photo" onPress={() => { 
       
       this.startSend();

      }}
      />
      
      <Dialog.Button label="Cancel" onPress={() => {       
        this.setState({showPrompt : false});
      }} />
      </Dialog.Container>
      
      
      <ScrollView style={styles.blueContainer} contentContainerStyle={styles.contentContainer}>
      
      <View>
      <Icon name='camera' type='font-awesome' color='#517fa4' size={200} />             
      </View>
      
      </ScrollView>
      
      <ScrollView style={styles.whiteContainer}>
      <Text style={styles.tabBarInfoTextBold}> Upload your photo  </Text> 
      <Text style={styles.tabBarInfoText}>Simply tab on 'Take Photo' and you're good to go.</Text>
      </ScrollView>
      
      <View style={styles.viewButton}> 
      <Button style={styles.defaultButton} buttonStyle={{
        borderRadius: 5, backgroundColor: "#394dcf"
      }} onPress={() => 
        {
          this.takePhoto();
        }} title="Take Photo" accessibilityLabel="Learn more about this purple button"
        />               
        </View>     
        
        </View>
      );
    } 
       
      
    takePhoto = async () => { 
      
      this.setState({showPrompt : false});
          
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
        
        let result = await this._handleImagePicked(pickerResult);
      }
    };
    
    _handleImagePicked = async pickerResult => {
      
      console.log('_handleImagePicked', this.state);      
      try 
      {
        this.setState({
          uploading: true,
          photoPickerResult : pickerResult
        });

        if (!pickerResult.cancelled) {   
          
          this.setState({
            showPrompt: true           
          });           
        }
      } 
      catch (e) {       
        console.log(e);  
      } 
      
    }; 
    
    startSend = async() => {
      
      let uploadResponse, uploadResult;   

      try {
        
        this.setState({
          uploading: true        
        });
        
        if (!this.state.photoPickerResult.cancelled) {          
     
          console.log('photoiinfo', this.state.photoDescripton);
          console.log('photoresult', this.state.photoPickerResult);

          uploadResponse = await this.uploadImageAsync(this.state.photoDescripton, this.state.photoPickerResult.uri);
          uploadResult = await uploadResponse.json();
          
          this.setState({
            image: uploadResult.location
          });       
          
        }
      } catch (e) {
        console.log({ uploadResponse });
        console.log({ uploadResult });
        console.log(e);  
      } 
      finally {
        this.setState({
          uploading: false,
          showPrompt : false
        });
      }
    }
    
    async uploadImageAsync(description, uri) {      
      
      console.log('uploading my image from camera' + uri);      
      let photoUploadUrl = AppConfig.PHOTO_UPLOAD_URL;
      
      // Note:
      // Uncomment this if you want to experiment with local server
      //
      // if (Constants.isDevice) {
      //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
      // } else {
      //   apiUrl = `http://localhost:3000/upload`
      // }
      console.log('photo camera path', uri);
      
      let uriParts = uri.split('.');
      let fileType = uriParts[uriParts.length - 1];
      
      console.log('data file name');
      console.log(fileType);
      
      let formData = new FormData();
      
      formData.append('image', {
        uri,
        name: 'photo.' + fileType, 
        type: 'image/' + fileType
      });
      
      formData.append('username', global.username);
      formData.append('description', description);
      
      let options = {
        method: AppConfig.POST,
        body: formData,
        headers: {
          Accept: AppConfig.APPLICATION_TYPE_JSON,
          'Content-Type': AppConfig.CONTENT_MULTIPART_FORM_DATA,
        },
      };
      
      return fetch(photoUploadUrl, options);
    }    
  }