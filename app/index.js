import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';
import { router, Stack, useNavigation } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, BorderRadiuses, View, Image, Icon, ListItem, Text, Card, FloatingButton, Assets } from 'react-native-ui-lib';
import * as Animatable from 'react-native-animatable';
import { BlurView } from 'expo-blur';
import search from '../yelp';

export default function Home() {
  const insets = useSafeAreaInsets();
  const sample = require('../sample.yelp.response.json');

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [placesList, setPlacesList] = useState(sample.businesses); // use smaple for testing, use [] for default or storage

  // StatusBar.call()
  // Location specific stuff...
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // let location = await Location.getCurrentPositionAsync({});
      console.log('location: ', location);
      console.log('places: ', placesList);
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

  // let oldStringify = JSON.stringify;
  // JSON.stringify = (obj, replacer, space) => oldStringify(obj, replacer || ((key, value) => {if(key && value === obj) return "[recursive]"; return value;}), space)

  const fix = function(obj) {
    for (i=0; i<Object.keys(obj).length; i++) {
      let a = obj[Object.keys(obj)[i]];
      
      if (Object.keys(obj)[i] == "categories") delete(obj[Object.keys(obj)[i]]);
      else if (Array.isArray(a)) obj[Object.keys(obj)[i]] = obj[Object.keys(obj)[i]].join('\n');
      else if (Object.keys(obj)[i] == "location") obj[Object.keys(obj)[i]] = "LOCATION";
    }

    return obj;
  }

  const model = (obj) => {
    return {
      id: obj.id,
      alias: obj.alias,
      name: obj.name,
      image_url: obj.image_url,
      is_closed: obj.is_closed,
      url: obj?.url,
      review_count: obj?.review_count,
      rating: obj?.rating,
      distance: obj?.distance ? (Math.round(obj.distance / 1609 * 100) / 100) + " mi" : "",
      price: obj?.price,
      location: obj?.location?.display_address.length > 0 ? obj?.location.display_address.join(',\n') : "",
      phone: obj?.phone,
      // display_phone: obj?.display_phone,
    }
  }

  const defaultImage = require('../assets/default.jpeg');
  const generateFlatList = (data) => {
    let selected = false;
    let output = <FlatList flexG contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 10 }} data={data} keyExtractor={item => item.id} renderItem={ ({item}) =>
        <Card row flex marginV-5 enableBlur={false} selected={selected} activeOpacity={1} enableShadow={false} 
          onPress={() => { 
            selected = true; 
            return router.navigate({ pathname: '/details', params: model(item) });
          }}
          style={{ width: '100%', padding: 10, backgroundColor: '#fff'}}>
          {/* <Card.Image source={{uri: item.image_url}} height={115} /> */}
          <Card.Section imageSource={ item.image_url ? {uri: item.image_url} : defaultImage } flexS imageStyle={{ height: '100%', width: 100 }}/>
          <Card.Section
            content={[
              {text: item.name, text70H: true, $textDefault: true, color: '#FF5910'},
              {text: model(item).location, text80: true, color: '#002D72'},
              {text: (Math.round(item.distance / 1609 * 100) / 100) + " mi", style: {position: 'absolute', right: 5, bottom: 7 }, text100: true, color: '#A2AAAD' }
            ]}
            contentStyle={{alignItems: 'left', paddingVertical: 5, color: 'white'}}
            flexG
            marginL-10
            />
        </Card>
    } />

    return <View>
      <Text color={'#FF5910'} text50H marginL-10 marginB-5 textAlign="center" justifyContent="center" alignItems="center">
        <Image source={require('../assets/hotdog.png')} width={26} height={46} alignItems="center" justifyContent="center" /> Hotdogging
      </Text>
      { output }
    </View>
  } // generateFlastList()

  return (
    <View style={styles.container} flex>
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Hotdogging',
          // https://reactnavigation.org/docs/headers#adjusting-header-styles
          headerStyle: { backgroundColor: 'green' },
          headerTintColor: 'red',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
          // headerTitle: props => <LogoTitle {...props} />,
          // headerTitle: props => <Text>Hotdogging</Text>,
        }}
      />
      <View flex style={{width: '100%', alignItems: 'center', paddingTop: insets.top}}>
        { generateFlatList(placesList) }
        {/* <BlurView style={{width: '100%', height: 300, overflow: 'hidden', padding: 20, zIndex: 99, position: 'absolute', bottom:0 }} /> */}
        {/* <LinearGradient style={{position: 'absolute', bottom: 0, width: '100%', height: 40}} colors={['rgba(0,45,114,0)', 'rgba(0,45,114,1)']} /> */}
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#e00043',
    // fcd492
    // e00043
    backgroundColor: '#002D72',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  // blurContainer: {
  //   flex: 1,
  //   padding: 20,
  //   margin: 0,
  //   textAlign: 'center',
  //   justifyContent: 'center',
  //   overflow: 'hidden',
  //   borderRadius: 20,
  // },
  image: { width: '30%'},
  border: {},
});

