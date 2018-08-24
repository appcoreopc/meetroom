import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export const styles = StyleSheet.create({
  defaultButton : {   
    color: '#394dcf', borderRadius : 26, 
  },
  viewButton : { 
    marginLeft:26, marginRight : 26, marginBottom : 10
  },
  containerLoginButton : { 
    marginTop : 10
  },
  containerLightBorder : {
    marginBottom: 20, borderColor : '#efefef'
  },
  bottomBorderLight : {  
    borderBottomColor : '#efefef'
  },    
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }, 
  containerSchedule: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop : 30
  },   
  mainIconContainer: {
    alignItems: 'center',display: 'flex',
    justifyContent: 'center',
    marginHorizontal: 50,
  },
  blueContainer: {
    paddingVertical : 30,
    flex: 1,
    backgroundColor: '#0a1640',
  },
  whiteContainer: {
    paddingVertical : 30,
    flex: 1,
    backgroundColor: '#fff',
  },
  whiteLoginContainer: {
    paddingVertical : 0,
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {    
    justifyContent: 'center', alignItems: 'center'
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
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
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 14,
    color: '#517fa4',
    textAlign: 'center',
    paddingVertical : 10,
    paddingHorizontal : 10
  },
  tabBarInfoTextBold: {
    fontSize: 17, fontWeight : 'bold',
    color: '#517fa4',
    textAlign: 'center', fontSize : 20
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
