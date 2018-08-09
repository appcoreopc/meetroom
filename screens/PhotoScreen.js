import React from 'react';
import { Ionicons, MaterialIcons, Foundation, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { ActivityIndicator, Button, Clipboard, Image,
  Share, Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
  
  import { Constants, ImagePicker, Permissions } from 'expo';
  import { Icon } from 'react-native-elements';
  
  export default class PhotoScreen extends React.Component {
    
    static navigationOptions = {
      header: null,
    };
    
    state = {
      image: null,
      uploading: false,
    };
    
    _pickImage = async () => {
      const {
        status: cameraRollPerm
      } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      
      // only if user allows permission to camera roll
      if (cameraRollPerm === 'granted') {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: false,
          //aspect: [4, 3],
        });
        
        this._handleImagePicked(pickerResult);
      }
    };
    
    async componentWillMount() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasCameraPermission: status === 'granted' });
    }
    
    takePicture = () => {    
      if (this.camera) {
        this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
      }
    };
    
    onPictureSaved = async photo => {
      await FileSystem.moveAsync({
        from: photo.uri,
        to: `${FileSystem.documentDirectory}photos/${Date.now()}.jpg`,
      });
      this.setState({ newPhotos: true });
    }
    
    render() {
      let {
        image
      } = this.state;
      
      return (
        
        
        <View style={styles.mainContainer}>
        
            <View style={styles.tabBarInfoContainer}>        
            
            <Icon
            raised 
            name='image'
            type='font-awesome'
            color='#ebebeb' size={70}
            />
            
            
            <Text style={styles.paragraph}>
            Change code in the editor and watch it change on your phone!
            Save to get a shareable url.
            </Text>
            
            <Text style={styles.paragraph}>
            Change code in the editor and watch it change on your phone!
            Save to get a shareable url.
            </Text>                    
            
            </View>
            
            
            {this._maybeRenderImage()}
            {this._maybeRenderUploadingOverlay()}
            
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
    
    _maybeRenderImage = () => {
      let {
        image
      } = this.state;
      
      if (!image) {
        return;
      }
      
      return (
        <View
        style={styles.maybeRenderContainer}>
        <View
        style={styles.maybeRenderImageContainer}>
        <Image source={{ uri: image }} style={styles.maybeRenderImage} />
        </View>
        
        <Text
        onPress={this._copyToClipboard}
        onLongPress={this._share}
        style={styles.maybeRenderImageText}>
        {image}
        </Text>
        </View>
      );
    };
    
    _maybeRenderUploadingOverlay = () => {
      if (this.state.uploading) {
        return (
          <View
          style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
          <ActivityIndicator color="#fff" size="large" />
          </View>
        );
      }
    };    
    
    _handleImagePicked = async pickerResult => {
      
      let uploadResponse, uploadResult;
      
      try {
        this.setState({
          uploading: true
        });
        
        if (!pickerResult.cancelled) {
          uploadResponse = await uploadImageAsync(pickerResult.uri);
          uploadResult = await uploadResponse.json();
          
          this.setState({
            image: uploadResult.location
          });
        }
      } catch (e) {
        console.log({ uploadResponse });
        console.log({ uploadResult });
        console.log({ e });
        alert('Upload failed, sorry :(');
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
  
  const styles = StyleSheet.create({
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#34495e',
    },
    tabBarInfoContainer: {
      flex : 1, 
      flexDirection : 'column',
      justifyContent : 'center',
      alignContent : 'center',
      position: 'absolute',
      top: 80,
      left: 0,
      right: 0,
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        android: {
          elevation: 0,
        },
      }),
      alignItems: 'center',
      backgroundColor: '#fbfbfb',
      paddingVertical: 30,
    }, 
    mainContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center'
    },
    maybeRenderUploading: {
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
    },
    maybeRenderContainer: {
      borderRadius: 3,
      elevation: 2,
      marginTop: 30,
      shadowColor: 'rgba(0,0,0,1)',
      shadowOpacity: 0.2,
      shadowOffset: {
        height: 4,
        width: 4,
      },
      shadowRadius: 5,
      width: 250,
    },
    maybeRenderImageContainer: {
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
      overflow: 'hidden',
    },
    maybeRenderImage: {
      height: 250,
      width: 250,
    },
    maybeRenderImageText: {
      paddingHorizontal: 10,
      paddingVertical: 10,
    }
  });