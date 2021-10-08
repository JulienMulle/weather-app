import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

//pour prendre en compte la latitude et la longitude, je vais transformer ma variable en fonction qui va prendre en parametre lat et lon.
//pour que les params soit pris en compte, je n'oublie ${}
const API_URL = (lat, lon) => `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid={08f65d029ed8ed2dae819f4187007ade}`

export default function App() {
  //1- on recupere les coordonnées de l'utilisateur
  const [location, setLocation] = useState(null)

useEffect(()=>{
  //je demande la permission d'acceder aux coordonnées de l'utilisateur, et attendre la reponse de l'utisateur
  // je ne peux pas stocker directement une fonction asynchrone dans useEffect, donc je vais la stocker
  //Pour recuperer le resultat, je vais destructurer la reponse
  const getCoordinates = async () =>{
  const { status} = await Location.requestForegroundPermissionsAsync()
  // je verifie le status
  if (status !== "granted") {
    return
  }
  // je vais recuperer sa permission
  const userLocation = await Location.getCurrentPositionAsync()
  setLocation(userLocation)
  }

  getCoordinates()
}, [])

//je verifie si location n'est pas null 
if (!location) {
  return    <View style={styles.container}>
      <Text> Domage, je ne peux pas afficher la météo où tu es situé </Text>
    </View>
}
  //2- realiser une requete vers nos serveur
  // ville
  //météo du moment
  //prévisions
  return (
    <View style={styles.container}>
      <Text> {location.coords.latitude} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
