import React from 'react';
import {  Text, View, StyleSheet, Image } from 'react-native';


const getIcon = (icon) =>`http://openweathermap.org/img/wn/${icon}@2x.png`

export default function Weather({ forecast }){

    return(
        <View style={styles.container} >
        <Text>{forecast.name}</Text>
        <Text>{forecast.hour}h</Text>
        {/*<Image
            source={{uri: getIcon(forecast.weather[0].icon)}}
            style={styles.image}
        />*/}
        <Text>{forecast.temp}°C</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: 140,
        width: 75,
        paddingVertical:6,
        justifyContent: "center",
        marginRight: 10, 
        borderRadius: 50
    },
    image: {
        width: 50,
        height: 50
    }

})