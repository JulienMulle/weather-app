import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import axios from 'axios';
import { ActivityIndicator } from 'react-native-paper';
//import CurrentWeather from './components/CurrentWeather';

//pour prendre en compte la latitude et la longitude, je vais transformer ma variable en fonction qui va prendre en parametre lat et lon.
//pour que les params soit pris en compte, je n'oublie ${}
//à la fin je rajoute la langue et le systeme metric
const API_URL = (lat, lon) => `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid={4317e5edbbc109394215be6d46884d0c}&lang=fr&units=metric`

export default function App() {
  //1- on recupere les coordonnées de l'utilisateur
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  

useEffect(()=>{
  //je demande la permission d'acceder aux coordonnées de l'utilisateur, et attendre la reponse de l'utisateur
  // je ne peux pas stocker directement une fonction asynchrone dans useEffect, donc je vais la stocker
  //Pour recuperer le resultat, je vais destructurer la reponse
  const getCoordinates = async () =>{
  const { status} = await Location.requestForegroundPermissionsAsync();
  // je verifie le status
  if (status !== "granted") {
    return
  }
  // je vais recuperer sa permission
  const userLocation = await Location.getCurrentPositionAsync();
  getWeather(userLocation);
  }

  getCoordinates();
}, [])

  //2- realiser une requete vers nos serveur
  const getWeather = async (location) => {
    try {
    const response = await axios.get(API_URL(location.coords.latitude, location.coords.longitude));

      setData(response.data);
      setLoading(false);
      
    } catch(e) {
      console.log("Erreur dans getWeather");
      console.log(location);
    }

  };

  if (loading) {
    return    <View style={styles.container}>
        <ActivityIndicator />
        <Text>Hello Darkness, my old friend</Text>
        <Text> Cache-cache erreur, trouve-moi !</Text>
      </View>
  }
  
  return (
    <View style={styles.container}>
      
     <CurrentWeather data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#E2E6',
    padding: 8,
  },
});
