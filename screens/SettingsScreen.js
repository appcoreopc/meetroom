import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import { styles } from '../shared/css/style';
import { Icon, List, ListItem, Avatar, Button } from 'react-native-elements';

export default class HomeScreen extends React.Component {   
  static navigationOptions = {
    title: 'About', headerStyle: {
      elevation: 0,
      shadowOpacity: 0
  }
};

  list = [
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President', 
      icon: 'av-timer'
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman',
      icon: 'flight-takeoff'
    },
  ];  
    
  render() {

    return (

      <View style={styles.containerSchedule}>
        <List containerStyle={styles.containerLightBorder}>  
         <ListItem containerStyle={styles.bottomBorderLight} key={1}
                title={              
                <View>
                    <Text style={{fontSize:14, color:'#3a4354'}}> Mike Foong </Text> 
                </View>    
                }
                subtitle={
                <View style={{paddingTop: 6}}>
                    <Text style={{fontSize:11, color:'#787d87'}}> KL, Malaysia </Text> 
                </View>             
                }

                rightIcon={
                <View>               
                    <Icon reverse name='user' type='font-awesome' color='#394DCF' />
                    <Text style={{fontSize:11, color:'#394DCF'}}> See Details </Text> 
                </View>   
                }                
                />   
        </List>
     
        <View style={{flexDirection: 'row', justifyContent : 'space-evenly', marginTop:10}} 
          containerStyle={styles.bottomBorderLight}> 
            <Icon reverse name='twitter' type='font-awesome' color='#394DCF' />
            <Icon reverse name='google-plus-square' type='font-awesome' color='#394DCF' />
            <Icon reverse name='facebook-square' type='font-awesome' color='#394DCF' />
        </View>
       
       <List containerStyle={styles.containerLightBorder}>     
         <ListItem containerStyle={styles.bottomBorderLight}      
                    key={2}
                    title={              
                    <View>
                        <Text style={{fontSize:14, color:'#3a4354'}}> About Me </Text> 
                    </View>    
                    }

                    subtitle={
                    <View style={{paddingTop: 6}}>
                        <Text style={{fontSize:11, color:'#787d87'}}> Tech Evangelist </Text> 
                    </View>             
                    }                          
            />               
        </List>

      </View>
    );
  }   
}

