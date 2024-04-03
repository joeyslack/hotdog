import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Colors, BorderRadiuses, View, Image, ListItem, Text, Card } from 'react-native-ui-lib';
import search from './yelp';

export default function App() {
  const sample = require('./sample.yelp.response.json');

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [placesList, setPlacesList] = useState([]);

  // Location specific stuff...
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log('location: ', location);
      setLocation(location);
      // DO YELP LOOKUP.
      search({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }).then(data => {
        setPlacesList(data.businesses);
      });
      
    })();
  }, []);


  // let text = 'Waiting..';
  // if (errorMsg) {
  //   text = errorMsg;
  // } 
  // else if (location) {
  //   text = JSON.stringify(location);
  //   // console.log('LOCATION_DUMP: ', location)
  // }

  const generateFlatList = (data) => {
    let output = <FlatList contentContainerStyle={{ paddingVertical: 0 }} data={data} keyExtractor={item => item.id} renderItem={ ({item}) =>
        <Card row marginV-10 marginH-10 activeOpacity={1} bg-$backgroundElevated enableBlur={false} flex onPress={() => console.log('pressed')}>
          {/* <Card.Image source={{uri: item.image_url}} height={115} /> */}
          <Card.Section imageSource={{uri: item.image_url}}  imageStyle={{height: '100%', width: 100 }}/>
          <Card.Section
            content={[
              {text: item.name, text60: true, $textDefault: true},
              {text: item.location.display_address.join(',\n'), text80: true, grey10: true},

            ]}
            contentStyle={{alignItems: 'left', paddingVertical: 10}}
            marginL-10
            />
        </Card>
    } />

    return <View><Text text50H marginL-10>Rawdogging with The Tank</Text>{ output }</View>
  } // generateFlastList()

  return (
    <View style={styles.container}>
      <SafeAreaView>
        { generateFlatList(placesList) }
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e00043',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  image: { width: '30%'},
  border: {},
});

