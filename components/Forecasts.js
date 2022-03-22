import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

//components
import Weather from './Weather';

export default function Forecasts({ data }){
    const [forecasts, setForecasts] = useState([]);

   useEffect(() => {
       const forecastsData = data.list.map(p => {
           // la date de openweatherapp n'est pas standard. je la manipule pour qu'elle corresponde à un standard et la stocke dans dt
           const dt = new Date(p.dt * 1000)
           return ({
               date: dt,
               hour: dt.getHours(),
               //j'arrondis la temp
               temp: Math.round(p.main.temp),
               icon: p.weather[0].icon,
               name: format(dt, "EEEE", { locale: fr})
          })
       })
       //logique pour un regroupement des éléments pour chaques journées

        //1. j'ai un tableau avec plusieurs jour: [lundi, lundi, lundi, mardi,...]
        //2. je veux regrouper(filter) les mêmes jour ensemble: [lundi, mardi,...]
        //3. je veux transmettre mes données pour chaques jours du nouveau tableau [{day: name, data: [forecast, forecast]}, {}, {}]
        let newForecastData = forecastsData.map(forecast => {
            return forecast.name
        }).filter((day, index, self)=>{
            //suppression des doublons, self.indexof(day) === index va prendre le premier element du tableau et je n'aurais plus de doublons(lundi, lundi)
            return self.indexOf(day) === index
        }).map((day)=>{
            // je renvoi mon tableau 3. de prevision qui correspond au jour (lundi)
            return{
                day,
                data: forecastsData.filter((forecast)=> forecast.name === day)
            }
        })
        console.log(newForecastData)
       setForecasts(newForecastData)
   }, [data])

    return (
        <ScrollView
        //parametre pour avoir le scroll horizontal 
            horizontal
            showHorizontalScrollIndicator={false}
            styles={styles.scroll}
            >
           {forecasts.map(p =>(
               <View id={p.id}>
                <Text>{p.day}</Text>
                {p.data.map(w => <Weather forecast={w} />)}
               </View>
           ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scroll: {
        width: "100%",
        height: "35%"
    }
})
