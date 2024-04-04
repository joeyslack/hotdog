import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import router, { Stack, useNavigation, useLocalSearchParams, useRouter} from 'expo-router';
import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Colors, BorderRadiuses, View, Image, ListItem, Text, Card } from 'react-native-ui-lib';
import search from '../yelp';

export default function Details() {
  // const [value, onChangeText] = React.useState(route.params.title);
  const navigation = useNavigation();
  const params = useLocalSearchParams();

  React.useEffect(() => {
    navigation.setOptions({ 
      headerShown: true, 
      title: params?.title ? params.title : 'Details'
   });
  }, [navigation]);

  const sample = require('../sample.yelp.response.json');

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
      
      // setLocation(location);
      // // DO YELP LOOKUP.
      // search({
      //   latitude: location.coords.latitude,
      //   longitude: location.coords.longitude,
      // }).then(data => {
      //   setPlacesList(data.businesses);
      // });
      
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
  const defaultImage = require('../assets/default.jpeg');
  const generateFlatList = (data) => {
   
    // let output = <FlatList contentContainerStyle={{ paddingVertical: 0, width: '100%' }} data={data} keyExtractor={item => item.id} renderItem={ ({item}) =>
    //     <Card enableShadow={true} row flex marginV-5 onPress={() => console.log('pressed')} style={{ width: '100%', padding: 10 }}>
    //       {/* <Card.Image source={{uri: item.image_url}} height={115} /> */}
    //       <Card.Section imageSource={ item.image_url ? {uri: item.image_url} : defaultImage } flexS imageStyle={{height: '100%', width: 100 }}/>
    //       <Card.Section
    //         content={[
    //           {text: item.name, text70H: true, $textDefault: true},
    //           {text: item.location.display_address.join(',\n'), text80: true, grey30: true},
    //           {text: (Math.round(item.distance / 1609 * 100) / 100) + " mi", style: {position: 'absolute', right: 5, bottom: 7 }, text100: true, grey30: true }
    //         ]}
    //         contentStyle={{alignItems: 'left', paddingVertical: 5}}
    //         flexG
    //         marginL-10
    //         />
    //     </Card>
    // } />

    return <View><Text text50H marginL-10 marginB-10>DETAILS VIEW</Text></View>
  } // generateFlastList()

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View><Text text50H marginL-10 marginB-10>DETAILS VIEW</Text></View>
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#e00043',
    backgroundColor: '#e00043',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  image: { width: '30%'},
  border: {},
});

