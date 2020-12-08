import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Alert, AsyncStorage, KeyboardAvoidingView, Platform, ScrollView, Picker  } from 'react-native';
import Constants from 'expo-constants'

import { Avatar , TextInput, Button } from 'react-native-paper'

import foto from '../assets/filha.png'

import HeaderModal from '../components/HeaderModal'
import Foto from '../components/Foto'

export default function CadastroContatoSOS({navigation, route}) {
  const {setContatos} = route.params
  const [listaParentescos, setListaParentescos] = useState([])
  const [parentesco, setParentesco] = useState('')
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [imagemBase64, setImagemBase64] = useState()

  useEffect(() => {
    carregarParentescos()
  }, [])

  async function carregarParentescos() {
    const itens = await fetch('https://southamerica-east1-caminhocerto.cloudfunctions.net/parentescos')
                          .then(res => res.json())
                          .catch(err => {
                            console.log('Falha ao tentar carregar parentescos', err);
                            return []
                          })
    setListaParentescos(itens)
  }

  async function salvar() {
    const contatos = await AsyncStorage
                              .getItem('@contatosSOS')
                              .then(JSON.parse) || []

    contatos.push({ parentesco, nome, telefone, imagemBase64})

    await AsyncStorage.setItem('@contatosSOS', JSON.stringify(contatos))
    
    setContatos(contatos)
    navigation.goBack()
  }

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView 
        style={{flex: 1}}
        behavior={"position"}
      >
        <HeaderModal
          titulo='CADASTRO DE CONTATO SOS'
          onPress={() => navigation.goBack()}
        />
        <View style={styles.main}>
          {
            imagemBase64 
              ? <Avatar.Image size={100} source={{uri: imagemBase64}} style={{alignSelf: 'center'}}/>
              : <Foto setImagemBase64={setImagemBase64}/>
          }
          
          {/*<TextInput
            mode="outlined"
            label="Parentesco"
            placeholder="Filha"
            onChangeText={value => setParentesco(value.toUpperCase())}
            style={{marginBottom: 10}}
          />*/}
          <Picker
            selectedValue={parentesco}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setParentesco(itemValue)}
          >
            {
              listaParentescos.map( p => <Picker.Item label={p.tipo} value={p.tipo} />)
            }
          </Picker>

          <TextInput
            mode="outlined"
            label="Nome"
            placeholder="José"
            onChangeText={value => setNome(value.toUpperCase())}
            style={{marginBottom: 10}}
          />
          <TextInput
            mode="outlined"
            label="Telefone"
            placeholder="(31) 98888-8888"
            keyboardType="phone-pad"
            onChangeText={value => setTelefone(value)}
            style={{marginBottom: 20}}
          />
          <Button 
              icon="check-outline"
              mode="contained"
              onPress={() => salvar()}
              style={{marginBottom: 10}}
            >
            Confirmar
          </Button>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  main: {
    flex: 1,
    padding: 15
  }
});
