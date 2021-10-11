import React, { useEffect, useState }from 'react';
import { View, Text, SteelSheet } from 'react-native';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function Forecasts({ data }){
    const [forecasts, setForecasts] = useState([]);

   useEffect(() => {
       const forecastsData = data.list.map(p => {
           // la date de apiweatherapp n'est pas standard. je la manipule pour qu'elle corresponde à un standard et la stocke dans dt
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
       setForecasts(forecastsData)
   }, [data])

    return (
        <View>
           {forecasts.map(p =>(
                <>
                <Text>{p.name}</Text>
                <Text>{p.hour}</Text>
                <Text>{p.temp}°C</Text>
                </>
            ))}
        </View>
    )
}

//const Styles = StyleSheet.create({

//})
