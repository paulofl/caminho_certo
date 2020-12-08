import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import logo from '../assets/logo.png';

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.titulo}>
        <Text style={styles.tituloParte1}>Caminho </Text>
        <Text style={[styles.tituloParte2]}>Certo</Text>
      </View>
      <Image source={logo} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#CCFFFF',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight
  },
  titulo: {
    flexDirection: 'row',
  },
  tituloParte1: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  tituloParte2: {
    color: '#1AA18A',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
});
