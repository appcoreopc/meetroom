import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text, Button,
    TouchableOpacity,
    View
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import { styles } from '../shared/css/style';
import { Icon, List, ListItem } from 'react-native-elements';


// <FlatList
//       data={this.state.data}
//       keyExtractor={item => item.id}
//       renderItem={({ item }) => (
//         <ListItem 
//         roundAvatar onPress={this.navigateToScreen(item.url)}
//         title={`${item.title} `}
//         subtitle={item.description}
//         avatar={{ uri: item.urlToImage }}
//         />
//       )}
//       />

export default class PhotoListScreen extends React.Component {    
    
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
    
    static navigationOptions = {
        header: null,
    };
        
    constructor(props) {
        
        super(props);
        
        this.state = {            
            loading: false,
            data: [],         
            error: null,
            refreshing: false
        };
    }
    
    async componentDidMount() {      

        this.getPhotoList();
    }

    async getPhotoList() 
    {
      let apiUri = "https://meetroomserver.azurewebsites.net/users/all";
            
      try {
        let response = await fetch(apiUri);
        let responseJson = await response.json();

        console.log(responseJson);
        
        this.setState({ 
          data : responseJson.articles
        });
        
        return responseJson.articles;
      } catch (error) {
        console.error(error);
      }
    }
    
    render() {
        
        return (
            <View style={styles.container}>
            
            <List containerStyle={{marginBottom: 20}}>
            {
                this.list.map((l, i) => (
                    
                    <ListItem
                    roundAvatar
                    avatar={{uri:l.avatar_url}}
                    key={i}
                    title={l.name}
                    leftIcon={{name: l.icon}}
                    />
                ))
                
            }
            </List>
            
            
            </View>
        );
    }
    
    _maybeRenderDevelopmentModeWarning() {
        if (__DEV__) {
            const learnMoreButton = (
                <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
                Learn more
                </Text>
            );
            
            return (
                <Text style={styles.developmentModeText}>
                Development mode is enabled, your app will be slower but you can use useful development
                tools. {learnMoreButton}
                </Text>
            );
        } else {
            return (
                <Text style={styles.developmentModeText}>
                You are not in development mode, your app will run at full speed.
                </Text>
            );
        }
    }
    
    _handleLearnMorePress = () => {
        WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
    };
    
    _handleHelpPress = () => {
        WebBrowser.openBrowserAsync(
            'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
        );
    };
}

