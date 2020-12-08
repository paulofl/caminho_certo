import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, Alert, Linking } from 'react-native';
import Constants from 'expo-constants';
import MapView, {Marker} from 'react-native-maps'
import * as Location from 'expo-location'

import HeaderModal from '../components/HeaderModal';
import BotaoMenu from '../components/BotaoMenu'

//const contato = {parentesco: 'FILHA', nome: 'LARISSA', telefone: '(031) 99999-8877'}

export default function Ligar({navigation, route}) {
  const {contato} = route.params

  const [localizacao, setLocalizacao] = useState() 

  async function obterLocalizacao() {
    const {status} = await Location.requestPermissionsAsync()

    if(status !== 'granted') {
      Alert.alert('Você precisa habilitar o serviço de localização do seu celular.');
    } else {
      const location = await Location.getCurrentPositionAsync();
      setLocalizacao({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      })
    }
  }

  async function enviarLocalizacao() {
    const {status} = await Location.requestPermissionsAsync()

    if(status !== 'granted') {
      Alert.alert('Você precisa habilitar o serviço de localização do seu celular.')
    } else {
      const location = await Location.getCurrentPositionAsync()
      
      const mensagem = `${contato.nome}, preciso de sua ajuda URGENTE. Estou neste lugar.
      https://www.google.com.br/maps/@${location.coords.latitude},${location.coords.longitude},18z`

      Linking.openURL(`whatsapp://send?text=${mensagem}&phone=+55${contato.telefone}`)
    }
  }

  useEffect(() => {
    obterLocalizacao()
  }, [])

  return (
    <View style={styles.container}>
      <HeaderModal
        titulo={`${contato.parentesco} ${contato.nome}`}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.main}>   
        <View style={styles.mapa}>
          <MapView
            initialRegion={localizacao}
            style={styles.mapView}
          >
            {
              localizacao && (
                <Marker
                  coordinate={localizacao}
                  title={"Você está aqui"}
                  description={"Esté é o lugar onde você está"}
                />
              )
            }


          </MapView>
          <View style={styles.positionBox}>
            <Text style={styles.positionTitle}>Você está aqui</Text>
          </View>
        </View>
        <View style={styles.botoes}>
          <BotaoMenu 
            titulo={`Ligar p/ ${contato.nome}`}
            corDeFundo='#FF4A19'
            corDoTexto='white'
            onPress={() => Linking.openURL(`tel:${contato.telefone}`)}
          />

          <BotaoMenu 
            titulo={`Enviar localização`}
            corDeFundo='#24CBAF'
            corDoTexto='white'
            onPress={() => enviarLocalizacao()}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  main: {
    flex: 1,
    padding: 20,
  },
  mapa: {
    flex: 1,
  },
  mapView: {
    width: '100%',
    height: '95%' 
  },
  positionBox: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    opacity: 0.75,
    marginTop: -100,
    marginHorizontal:40,
    padding: 5,
    shadowColor: '#000000',
    elevation: 5,
  },
  positionTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c'
  },
  botoes: {
    justifyContent: 'space-around',
    flexBasis: 200
  }
});
