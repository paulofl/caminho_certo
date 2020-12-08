import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import Constants from 'expo-constants'

import foto from '../assets/filha.png'

import HeaderModal from '../components/HeaderModal';
import Contato from '../components/Contato';
import FloatButton from '../components/FloatButton';

export default function ContatosSOS({navigation, route}) {
  const [contatos, setContatos] = useState([]);

  useEffect(() => {
    carregarContatos()
  }, [])

  async function carregarContatos() {
    const itens = await AsyncStorage
                          .getItem('@contatosSOS')
                          .then(JSON.parse) || []

    setContatos(itens)
  }
  
  // console.log(JSON.stringify(contatos))

  return (
    <View style={styles.container}>
      <HeaderModal
        titulo='CONTATOS SOS'
        onPress={() => navigation.goBack()}
      />
      <FlatList 
        data={contatos}
        keyExtractor={(item) => item.telefone}
        renderItem={({item}) => 
          <TouchableOpacity
            onPress={() => navigation.navigate('ligar', {contato: item})}
          >
            <Contato
              foto={<Image source={{uri: item.imagemBase64}} style={styles.foto}  />}
              parentesco={item.parentesco.toUpperCase()}
              nome={item.nome.toUpperCase()}
              telefone={item.telefone}
            />
          </TouchableOpacity>
        }
      > 
      </FlatList>
      <FloatButton 
        onPress={() => navigation.navigate('cadastrarContato', {setContatos})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight
  },
  foto: {
    width: 70,
    height: 90,
    borderRadius: 14,
    elevation: 3,
  },
});
