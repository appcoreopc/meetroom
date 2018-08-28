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

export default class DetailScreen extends React.Component {
  
  static navigationOptions = {
    title: '', headerStyle: {
      elevation: 0,
      shadowOpacity: 0
    }
  };
  
  constructor(props) { 

    super(props);      

    this.state = {            
      itemTitle: this.props.navigation.state.params.description,
      imageUrl: this.props.navigation.state.params.url  
    };
  }  
  
  async componentDidMount() {      
    console.log(this.props.navigation.state.params);
  } 
    
    render() {
   
      return (
        <View style={styles.container}>
        
        <ScrollView style={styles.blueContainer} contentContainerStyle={styles.contentContainer}>
        
            <View>       
              <Image style={{ borderWidth:1,
                borderColor:'rgba(0,0,0,0.2)',
                alignItems:'center',
                justifyContent:'center',
                marginBottom : 5,
                width: 400,
                height:600,
                backgroundColor:'#fff'}} source={{uri : this.state.imageUrl}} />         
            </View>  
            
        </ScrollView>
        
        <View style={{ height: 100 }} >    
            <Text style={styles.tabBarInfoText}> {this.state.itemTitle}  </Text>  
         </View>   
     
        </View>
      );
    }  
  }