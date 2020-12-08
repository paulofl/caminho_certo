import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default function Contato({ foto, parentesco, nome, telefone }) {
  return (
    <View style={styles.contato}>
      {foto}
      <View style={styles.dados}>
        <Text style={styles.texto}>{parentesco}</Text>
        <Text style={[styles.texto, styles.destaque]}>{nome}</Text>
        <Text style={styles.texto}>{telefone}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contato: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 20
  },
  dados: {
    flexGrow: 1,
    flexDirection: 'column',
    padding: 10
  },
  texto: {
    fontFamily: 'Roboto',
    fontSize: 14
  },
  destaque: {
    fontWeight: 'bold'
  }
});
