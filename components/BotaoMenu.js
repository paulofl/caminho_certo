import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function BotaoMenu({titulo, corDeFundo='#24CBAF', onPress}) {
  return (
    <TouchableOpacity
      style={[styles.botao, {backgroundColor: corDeFundo}]}
      onPress={onPress}
    >
      <Text style={styles.texto}>{titulo}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  botao: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 70,
    backgroundColor: 'silver',
    borderRadius: 20,
    elevation: 4
  },
  texto: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 32,
    color: 'white',
  }
})