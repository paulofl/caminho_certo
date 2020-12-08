import * as React from 'react';
import { Text, View, StyleSheet, Button, Alert} from 'react-native';
import Constants from 'expo-constants'

import Header from '../components/Header'
import logo from '../assets/logo.png'
import BotaoMenu from '../components/BotaoMenu'

export default function Home({navigation, route}) {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.opcoes}>
        <BotaoMenu 
          titulo='SOS'
          corDeFundo='#FF4A19'
          corDoTexto='white'
          onPress={() => navigation.navigate('contatos')}
        />

        <BotaoMenu 
          titulo='REGISTRO'
          corDeFundo='#24CBAF'
          corDoTexto='white'
          onPress={() => Alert.alert('Clique em Registro')}
        />

        <BotaoMenu 
          titulo='RASTREIO'
          corDeFundo='#24CBAF'
          corDoTexto='white'
          onPress={() => Alert.alert('Clique em Rastreio')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  opcoes: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    padding: 20,
  }
});