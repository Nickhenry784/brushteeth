import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions,
  ImageBackground, 
  Image,
  FlatList, 
  Alert  } from "react-native";
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const dataBtn = [
  {id: 1, image: images.s1},
  {id: 2, image: images.s2},
  {id: 3, image: images.s3},
  {id: 4, image: images.s4},
  {id: 5, image: images.s5},
  {id: 6, image: images.s6},
  {id: 7, image: images.s7},
  {id: 8, image: images.s8},
  {id: 9, image: images.s9},
]

const numCol = 3;

const HomeScreen = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);
  const dispatch = useDispatch();

  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }

  const onClickStartButton = () => {
    if(points.value === 0){
      Alert.alert("Please buy more turn!");
      return false;
    }
    dispatch(decrement());
    navigation.navigate("Play");
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={onClickTurnButton}>
          <View style={appStyle.turnView}>
            <Image source={images.turn} style={appStyle.buyImage} />
            <Text style={appStyle.turnText}>{points.value}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={appStyle.playView}>
        <TouchableOpacity onPress={onClickStartButton}>
          <Image source={images.play} style={appStyle.playBtn} />
        </TouchableOpacity>
      </View>
      <Text style={appStyle.labelText}>Choose the right image with the model</Text>
      <View style={appStyle.bottomView}>
        <FlatList 
          data={dataBtn}
          scrollEnabled={false}
          numColumns={numCol}
          renderItem={({item}) => (
            <Image source={item.image} style={appStyle.itemImage} />
          )}
        />
      </View>
    </ImageBackground>
  );
};


export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    resizeMode: 'cover',
  },
  appBar: {
    flex: 0.1,
    paddingRight: 20,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  turnView: {
    flexDirection: 'row',
    width: windowWidth * 0.15,
    marginRight: 10,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  turnText: {
    fontSize: 30,
    fontFamily: 'knitting-pattern',
    color: 'white',
  },
  buyImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  playView: {
    flex: 0.4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtn: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
  itemImage: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  labelText: {
    fontSize: 26,
    fontFamily: 'knitting-pattern',
    color: 'white',
    textAlign: 'center',
  },
  bottomView: {
    flex: 0.6,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;