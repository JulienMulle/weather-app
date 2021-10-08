import { isSameDay } from "date-fns";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const getIcon = (icon) =>`http://openweathermap.org/img/wn/${icon}@4x.png`

export default function CurrentWeather( {data}) {
    const [currentWeather, setcurrentWeather] = useState(null)

    useEffect(() => {
        const currentW = data.list.filter(forecast => {
            //prevision du jour
            const today = new Date().getTime()+ Math.abs(data.city.timezone * 1000)
            // prevision des jours à venir
            const forecastDate = new Date(forecast.dt *1000)
            return isSameDay( today, forecastDate)
        })
        //j'utilise useState pour afficher la prevision souhaiter
        setcurrentWeather(currentW[0])
    }, [data])

    return (
        <View>
        {/* le ? c'est pour ne pas fair crasher l'app si c'est null */}
        <Text> {data.city.name} </Text>
        <Text> Aujourd'hui </Text>
        <Image 
            source={{ uri: getIcon(currentWeather?.weather[0].icon)}} 
            style={{width:150, height:150}}
        />
        <Text> {currentWeather?.main.temp}°C </Text>
        <Text> {currentWeather?.weather[0].description} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    city: {}
})