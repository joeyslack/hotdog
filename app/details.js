import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import router, { Stack, useNavigation, useLocalSearchParams, useRouter} from 'expo-router';
import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Colors, BorderRadiuses, View, Image, ListItem, Text, Card } from 'react-native-ui-lib';
import search from '../yelp';


import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://kwlymkxyljhhouzeaocy.supabase.co'
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)



export default function Details() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();

  React.useEffect(() => {
    navigation.setOptions({ 
      headerShown: true, 
      title: params?.title ? params.title : 'Details'
   });
  }, [navigation]);

  // const sample = require('../sample.yelp.response.json');
  // const [location, setLocation] = useState(null);
  // const [errorMsg, setErrorMsg] = useState(null);
  // const [placesList, setPlacesList] = useState([]);

  // // Location specific stuff...
  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     console.log('location: ', location);
      
  //     // setLocation(location);
  //     // // DO YELP LOOKUP.
  //     // search({
  //     //   latitude: location.coords.latitude,
  //     //   longitude: location.coords.longitude,
  //     // }).then(data => {
  //     //   setPlacesList(data.businesses);
  //     // });
      
  //   })();
  // }, []);


  // let text = 'Waiting..';
  // if (errorMsg) {
  //   text = errorMsg;
  // } 
  // else if (location) {
  //   text = JSON.stringify(location);
  //   // console.log('LOCATION_DUMP: ', location)
  // }
  const defaultImage = require('../assets/default.jpeg');
  

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View><Text text50H marginL-10 marginB-10>DETAILS VIEW</Text></View>
      </SafeAreaView>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#e00043',
    backgroundColor: '#002D72',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  image: { width: '30%'},
  border: {},
});

