import { isSameDay } from "date-fns";
import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

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
        <>
        {/* le ? c'est pour ne pas fair crasher l'app si c'est null */}
        <Text> {data?.city?.name} </Text>
        </>
    )
}

const styles = StyleSheet.create({
    city: {}
})