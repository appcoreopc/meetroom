
import React, {Component} from 'react';
import {     
    ActivityIndicator, View       
} from 'react-native';

export const ActivitySpinner = ({isBusy}) => { 
    return (         
           <ActivityIndicator           
            animating={isBusy} size="large" /> 
    );
  };  
