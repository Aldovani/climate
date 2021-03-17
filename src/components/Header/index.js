import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'


export default function Header({background,icon,weather}) {
  return (

    <LinearGradient
      style={styles.header}
      colors={background}>

      <Text style={styles.date}>{weather.results.date}</Text>
      <Text style={styles.city}>{weather.results.city_name}</Text>

      <Ionicons
        name={icon.name}
        color={icon.color}
        size={150}
      />

      <Text style={styles.temp}>{weather.results.temp}°</Text>

    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '95%',
    height: '55%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  date: {
    fontSize: 17,
    color: '#fff',

  },
  city: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 80,
    color: '#fff',
    fontWeight: 'bold',
  }
})