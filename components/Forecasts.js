import React, { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
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
       setForecasts(forecastsData)
   }, [data])

    return (
        <ScrollView
        //parametre pour avoir le scroll horizontal 
            horizontal
            showHorizontalScrollIndicator={false}
            >
           {forecasts.map(p =>(
               <Weather forecast={p} />
           ))}
        </ScrollView>
    )
}

//const Styles = StyleSheet.create({

//})
