import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, StyleSheet, FlatList, View, Platform } from 'react-native'
import * as Location from 'expo-location'

import Menu from '../../components/Menu'
import Header from '../../components/Header'
import Conditions from '../../components/Conditions'
import Forecast from '../../components/Forecast'

import api, { key } from '../../services/api'


export default function Home() {
  const [errorMsg, setErrorMsg] = useState(null)
  const [loading, setLoading] = useState(true)
  const [weather, setWeather] = useState([])
  const [icon, setIcon] = useState({ name: 'cloud', color: '#FFFFFF' })
  const [background, setBackground] = useState(['#1ED6FF', '#97C1FF'])


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permissão negada');
        setLoading(false)
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      //console.log(location.coords)

      const response = await api.get(`/weather?key=${key}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`)

      setWeather(response.data);

      console.log("resposnseeeee " + response)


      if (response.data.results.currently === 'noite') {
        setBackground(['#0C3741', '#0F2F61'])
      }

      switch (response.data.results.condition_slug) {
        case 'clear_day':
          setIcon({ name: 'partly_sunny', color: '#FFB300' });
          break;

        case 'rain':
          setIcon({ name: 'rainy', color: '#FFFFFF' });
          break;

        case 'storm':
          setIcon({ name: 'rainy', color: '#FFFFFF' });
          break;
      }
      console.log(weather)
      setLoading(false)

    })();
  }, []);


  console.log(weather)
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 17, fontStyle: 'italic' }}>Carregando dados .... </Text>
      </View>
      
    )


  }
  return (
    <SafeAreaView style={styles.container}>
      <Menu />
      <Header background={background} weather={weather} icon={icon} />
      <Conditions weather={weather} />
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={{ paddingBottom: "5%" }}
        style={styles.list}
        data={weather.results.forecast}
        keyExtractor={item => item.date}
        renderItem={({ item }) => <Forecast data={item} />}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8f0ff',
    paddingTop: '5%',
  },
  list: {
    marginTop: 10,
    marginLeft: 10,
  }
})