import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {Camera} from 'expo-camera'

import {Ionicons} from '@expo/vector-icons'

export default function Foto({setImagemBase64}){
  const [hasPermission, setHasPermission] = useState(null);
  const [typeCamera, setTypeCamera] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    obterPermissaoCamera()
  }, []);

  async function obterPermissaoCamera() {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  }

  if (hasPermission === null) return <View />;

  if (hasPermission === false) return <Text>No access to camera</Text>;

  const reverterCamera = () => {
    if(typeCamera === Camera.Constants.Type.back)
      setTypeCamera(Camera.Constants.Type.front)
    else
      setTypeCamera(Camera.Constants.Type.back)
  }

  const tirarFoto = async () => {
    if(this.camera){
      const opcoes = {quality:0.3, base64: true}
      const data = await this.camera.takePictureAsync(opcoes)
      // alert(data.uri)
      setImagemBase64(`data:image/jpg;base64,` + data.base64)
    }
  }

  return(
    <Camera
      style={styles.camera}
      type={typeCamera}
      pictureSize='1'
      ref={ref => {
        this.camera = ref
      }}
    >
      <View
        style={styles.cameraView}
      >
        <TouchableOpacity onPress={reverterCamera}>
          <Ionicons name="ios-reverse-camera" size={60} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={tirarFoto}>
          <Ionicons name="ios-camera" size={60} color="white" />
        </TouchableOpacity>
      </View>
    </Camera>
  )
}

const styles = StyleSheet.create({
  camera: {
    width: '100%',
    height: 450
  },
  cameraView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end'
  }
})