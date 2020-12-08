import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';

import { Ionicons } from '@expo/vector-icons'; 

export default function HeaderModal({titulo, onPress}){
  return(
    <View
      style={styles.header}
    >
      <TouchableOpacity
        onPress={onPress}
      >
        <Ionicons name="md-arrow-round-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.text}>{titulo}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#24CBAF',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop: Constants.statusBarHeight
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 18,
    color: 'white',
    flexGrow: 1,
    textAlign: 'center',
    fontWeight: "bold"
  }
});