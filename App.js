import React, {useEffect} from 'react';
import {Platform} from 'react-native'

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

import Home from './screens/Home'
import ContatosSOS from './screens/ContatosSOS'
import Ligar from './screens/Ligar'
import CadastrarContatoSOS from './screens/CadastroContatoSOS'

const Stack = createStackNavigator()

export default function App() {

  useEffect(() => {
    registrarPushNotification()
  }, [])

  async function registrarPushNotification() {
    let {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS)

    if(status !== 'granted') {
      let {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    }

    if(status !== 'granted') {
      alert('É necessária a permissão de notificação para receber promoções dos nosso parceiros.')
      return
    }

    const expoToken = await Notifications.getExpoPushTokenAsync()
    const token = expoToken.data
    console.log('Token: ', token)
  }

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="home">
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="contatos" component={ContatosSOS} />
        <Stack.Screen name="ligar" component={Ligar} />
        <Stack.Screen name="cadastrarContato" component={CadastrarContatoSOS} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
