import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import router, { Stack, useNavigation, useLocalSearchParams, useRouter} from 'expo-router';
import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Colors, BorderRadiuses, View, Image, ListItem, Text, Card, Button } from 'react-native-ui-lib';
// import search from '../yelp';
import Ionicons from '@expo/vector-icons/Ionicons';

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://kwlymkxyljhhouzeaocy.supabase.co'
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


export default function Details() {
  const navigation = useNavigation();
  // const router = useRouter();
  const item = useLocalSearchParams();

  React.useEffect(() => {
    navigation.setOptions({ 
      headerShown: true, 
      title: item?.title ? item.title : 'Details'
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

  const renderStars = function(accessKey, stars = 0) {
    let renderHtml = [];
    let selectedRating = null;
    for (let i = 1; i < 6; i++) {
      // renderHtml += <Ionicons name=`${stars}` size={32} />;
      renderHtml.push(<Ionicons name={stars >= i ? 'star' : 'star-outline'} size={32} key={i} onPress={() => {
        updateStars(accessKey, i);
        selectedRating = 1;
       //  updateStars(accessKey, i);
      }} />);

      if (selectedRating != null)
        renderStars(accessKey, selectedRating);
      // break;
    }

    return renderHtml;
  }


  var ratio = renderStars(0, 3);
  var char = renderStars(1, 2);
  var snap = renderStars(2, 5);
  var taste = renderStars(3, 3);
  var atmosphere = renderStars(4, 1);
  var score = 5;

  const scoreRubric = [
    ratio,
    char,
    snap,
    taste,
    atmosphere,
  ];




  // Access Key, star rating Value
  const updateStars = function(accessKey, newValue) {
    if (!accessKey && accessKey == undefined) return false;

    scoreRubric[accessKey] = renderStars(accessKey, newValue);

    return scoreRubric;
  }


  const defaultImage = require('../assets/default.jpeg');
  const camera = require('../assets/cameraSelected.png');

  return (
    <View style={styles.container} flexG>
      <SafeAreaView>
        <Card row enableBlur={false} selected={false} activeOpacity={1} enableShadow={false} padding-10
          onPress={() => {}} 
          style={{ }}>
          <Card.Section imageSource={ item.image_url ? {uri: item.image_url} : defaultImage } flexS imageStyle={{height: 100, width: 100 }} />
          <Card.Section
            content={[
              {text: item.name, text70H: true, $textDefault: true, color: '#FF5910'},
              {text: item.location, text80: true, color: '#002D72'},
              {text: (Math.round(item.distance / 1609 * 100) / 100) + " mi", style: {position: 'absolute', right: 5, bottom: 7 }, text100: true, color: '#A2AAAD' }
            ]}
            contentStyle={{alignItems: 'left', paddingVertical: 5, color: 'white'}}
            flexG
            marginL-10
            />
        </Card>

        <View padding-10 marginT-10 center>
          <Button marginB-40 label={'Take a picture'} iconSource={camera} backgroundColor={'#002D72'} />

          <Text $textNeutral marginB-20 marginH-20 center>Accurately rate your hotdog experience according to the following rubric</Text>
          
          <Text $textPrimary>Bun-to-dog ratio</Text>
          <Text>{ scoreRubric[0] }</Text>

          <Text $textPrimary marginT-20>Char / Cook Quality</Text>
          <Text>{ scoreRubric[1] }</Text>

          <Text $textPrimary marginT-20>Snap</Text>
          <Text>{ scoreRubric[2] }</Text>

          <Text $textPrimary marginT-20>Taste</Text>
          <Text>{ scoreRubric[3] }</Text>

          <Text $textPrimary marginT-20>Atmosphere of Establishment</Text>
          <Text>{ scoreRubric[4] }</Text>

          { ratio > 0 && char > 0 && snap > 0 && taste > 0 && atmosphere > 0 && 
            <><Text $textMajor marginT-40>Overall Score/Text</Text><Text>{score}</Text></>
          }

        </View>
      </SafeAreaView>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#e00043',
    // backgroundColor: '#002D72',
    // alignItems: 'center',
    // justifyContent: 'center',
    color: '#fff',
    backgroundColor: '#fff'
  },
  image: { width: '30%'},
  border: {},
});

