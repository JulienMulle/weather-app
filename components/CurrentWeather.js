import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function CurrentWeather( {data}) {

    useEffect(() => {
        data.list.filter(forecast)
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